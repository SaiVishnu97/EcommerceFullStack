import React from 'react'
import { useSelector } from 'react-redux';
import {loadStripe} from '@stripe/stripe-js';

const PaymentReact = () => {

    const cartproducts=useSelector((output)=>{return output.product.cart;})
   
   
    const makePayment = async()=>{
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);

        const body = {
            products:cartproducts
        }
        const headers = {
            "Content-Type":"application/json"
        }
        console.log(process.env.REACT_APP_BACKEND_URL);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/payments`,{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        });

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId:session.id
        });
        
        if(result.error){
            console.log(result.error);
        }
    }

  return (
    <div>
        
            <button className="btn btn-primary" onClick={makePayment}>
           Pay the bill
          </button>
    </div>
  )
}

export default PaymentReact