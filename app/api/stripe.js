import Stripe from 'stripe'
import { database } from "../libs/AppWriteClient";
import useGetPostById from "../hooks/useGetPostById";

const stripe = new Stripe(process.env.
  NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body.MainPost)
    
      const { post } = req.body;
    
      try {
        // Валидация postId и извлечение деталей публикации из БД
        const { trackName, price } = await database.useGetPostById(post?.user_id); 

        const imageUrl = post?.image_url ?? '';


        if (!trackName || !price) {
          return res.status(404).json({ error: 'Could not retrieve post details.' });
        }
    
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                price: post.price,
                name: post.trackname,
                image: post.image_url,
              },
              unit_amount: post.price * 100, // Assuming there is a price field in the post data
            },
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      console.error('Error during checkout session creation:', err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}


// CHECKOUT SESSION , GUIDE FROM JSMASTERY  
// это должнно обраотаь заказ взяв данные из db и это активиурется handlecheckoout кнопкой


