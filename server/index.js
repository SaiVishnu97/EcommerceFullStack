
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { v4: uuid4 } = require('uuid');
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/payments', async (req, res) => {
    const {products} = req.body;


    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.title,
            },
            unit_amount:product.price * 100,
        },
        quantity:product.count
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        shipping_address_collection: {
            allowed_countries: ['US', 'CA','IN'], // Specify the countries where shipping is allowed
        },
        success_url:`${process.env.FRONTEND_URL}/success`,
        cancel_url:`${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({id:session.id})
 
});

app.listen(3001, () => console.log("Server listening on port", 3001));
