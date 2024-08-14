// app/api/checkout_sessions/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import useCartStore from "@/app/stores/useCartStore";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  console.log("Incoming request to /api/checkout_sessions");
  console.log("Request headers:", request.headers);

  const { userId, cartItems } = await request.json();
  console.log("Request Body: userId:", userId, ", cartItems:", cartItems);

  // Используем промис для установки userId в Zustand Store
  const setUserId = useCartStore.getState().setUserId;
  await setUserId(userId);

  // Проверяем, что userId был сохранен корректно
  const savedUserId = useCartStore.getState().userId;
  console.log("Saved userId in Zustand:", savedUserId);

  if (savedUserId !== userId) {
    console.error("Error saving user ID in Zustand store");
    return NextResponse.json({ error: "Error saving user ID" });
  }

  // Сохраняем cartItems в Zustand Store
  const setCartItems = useCartStore.getState().setCartItems;
  setCartItems(cartItems);

  // Проверяем, что cartItems были сохранены корректно
  const savedCartItems = useCartStore.getState().cartItems;
  console.log("Saved cartItems in Zustand:", JSON.stringify(savedCartItems));

  if (!Array.isArray(savedCartItems) || savedCartItems.length !== cartItems.length) {
    console.error("Error saving cart items in Zustand store");
    return NextResponse.json({ error: "Error saving cart items" });
  }

  try {
    // Проверяем корректность cartItems
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      console.log("Creating Stripe Checkout Session...");

      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        line_items: cartItems.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100, // Convert dollars to cents
          },
          quantity: item.quantity,
        })),
        success_url: `${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}&userId=${userId}&cartItems=${encodeURIComponent(JSON.stringify(cartItems))}`,
        cancel_url: `${request.headers.get("origin")}/?canceled=true`,
      });

      console.log("Stripe Checkout Session created:", session);

      return NextResponse.json({ session });
    } else {
      console.log("No data found in the cartItems.");
      return NextResponse.json({ message: "No Data Found" });
    }
  } catch (err: any) {
    console.error("Error creating Stripe Checkout Session:", err);
    console.error("Error message:", err.message);
    console.error("Error stack trace:", err.stack);
    return NextResponse.json({ error: err.message });
  }
}
