import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import db from "@/lib/db";
import { auth } from "../../../../auth";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const sessionAuth = await auth();
    const userId = sessionAuth?.user?.id;

    const { items, shippingAddress, email } = await req.json();

    if (!items || items.length === 0) {
      return new NextResponse("Cart is empty", { status: 400 });
    }

    // Lookup real prices from DB
    const bookIds = items.map((item: any) => item.book.id);
    const books = await db.book.findMany({
      where: {
        id: {
          in: bookIds,
        },
      },
    });

    const line_items: any[] = [];
    const orderItems: any[] = [];
    let totalAmount = 0;

    items.forEach((item: any) => {
      const book = books.find((b) => b.id === item.book.id);
      if (book) {
        // Calculate discounted price
        const price = book.price * (1 - book.discount / 100);
        totalAmount += price * item.quantity;

        line_items.push({
          quantity: item.quantity,
          price_data: {
            currency: "USD",
            product_data: {
              name: book.title,
            },
            unit_amount: Math.round(price * 100), // Stripe expects amounts in cents
          },
        });

        orderItems.push({
          bookId: book.id,
          quantity: item.quantity,
          priceAtPurchase: price,
        });
      }
    });

    // Dummy shipping (free if > $50, else $5.99)
    const shippingAmount = totalAmount > 50 ? 0 : 5.99;
    
    if (shippingAmount > 0) {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: "Shipping",
          },
          unit_amount: Math.round(shippingAmount * 100),
        },
      });
    }

    // Dummy Tax (8%)
    const taxAmount = totalAmount * 0.08;
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: "Estimated Tax (8%)",
        },
        unit_amount: Math.round(taxAmount * 100),
      },
    });

    // Create Order in DB
    const order = await db.order.create({
      data: {
        userId: userId || null,
        guestEmail: email || null,
        totalAmount: totalAmount + shippingAmount + taxAmount,
        shippingAmount: shippingAmount,
        taxAmount: taxAmount,
        status: "PENDING",
        paymentMethod: "STRIPE",
        paymentStatus: "PENDING",
        shippingAddress: shippingAddress,
        billingAddress: shippingAddress, // simplified
        items: {
          create: orderItems,
        },
      },
    });

    // Create Payment record
    await db.payment.create({
      data: {
        orderId: order.id,
        provider: "STRIPE",
        amount: order.totalAmount,
        status: "PENDING",
      },
    });

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json({ url: session.url }, { headers: corsHeaders });
  } catch (error) {
    console.error("[CHECKOUT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
