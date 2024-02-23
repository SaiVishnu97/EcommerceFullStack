import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { useSelector } from 'react-redux';
import {loadStripe} from '@stripe/stripe-js';

const PaymentReact = () => {

    const cartproducts=useSelector((output)=>{return output.product.cart;})
    const [totalbill,setTotalBill]=React.useState(0);
   
    const calculateBill=(event)=>
    {
        event.preventDefault();
        const amount=cartproducts.reduce((acc,val)=>val.price*val.count+acc,0);
        console.log(amount);
        setTotalBill(amount);
    }
    const makePayment = async()=>{
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);

        const body = {
            products:cartproducts
        }
        const headers = {
            "Content-Type":"application/json"
        }
        const response = await fetch("http://localhost:3001/payments",{
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