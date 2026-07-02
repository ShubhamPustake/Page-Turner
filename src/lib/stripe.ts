import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy_key", {
  apiVersion: "2026-06-24.dahlia", // Match the version required by the installed package
  typescript: true,
});
