import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getUserSession } from '@/lib/Reuseable/session';
import { PLAN_PRICE_ID, stripe } from '@/lib/stripe';

// import { stripe } from '../../../lib/stripe'
// import { PLAN_PRICE_ID } from '@/lib/stripe';
// import { getUserSession } from '@/lib/ReuseableFunc/session';

export async function POST(request) {
    try {
        const user = await getUserSession();
      const formData = await request.formData();
      const recipeId = formData.get("recipe_id")
      const recipeName = formData.get("recipe_name");
      const recipePrice = formData.get("recipe_price");
    const headersList = await headers()
    const origin = headersList.get('origin')

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
              customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price_data:{
            currency: 'usd',
            unit_amount: Math.round(recipePrice * 100), // Convert to cents
            product_data: {
              name: recipeName,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata:{recipeId,recipeName,recipePrice,userId:user?.id,userEmail:user?.email},
      success_url: `${origin}/payment_success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}