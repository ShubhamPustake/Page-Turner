import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import db from "@/lib/db";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error("[WEBHOOK_ERROR]", error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return new NextResponse("Order ID not found in metadata", { status: 400 });
    }

    // Update order status
    await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "PROCESSING",
        paymentStatus: "PAID",
      },
    });

    // Update payment record
    await db.payment.update({
      where: {
        orderId: orderId,
      },
      data: {
        status: "PAID",
        transactionId: session.payment_intent as string,
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}
