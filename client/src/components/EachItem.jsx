import React from 'react'
import { useParams } from 'react-router-dom'
import '../Styling/EachItem.css'
import { useSelector,useDispatch } from 'react-redux'
import { addProductsToCart,removeProductsFromCart } from '../redux'
import { DisplayPlusAndMinus } from './Shoppingbody'

const EachItem = () => {

    const params=useParams();
    const dispatch=useDispatch();
    const allItems=useSelector(output=>output.product.products);
    const cartproducts=useSelector((output)=>{return output.product.cart;})
    const [item,setItem]=React.useState({});

    React.useEffect(()=>{
        allItems.forEach((val)=>{
            if(val.id===parseInt(params.id))
            setItem(val);
        });
    },[allItems,params.id])
    
    function addToTheCart(product)
    {
      let count=1;
      cartproducts.forEach((val)=>{
        if(val.title===product.title)
          count=val.count+1})
      dispatch(addProductsToCart(product,count))
      return count
    }
    function removeFromCart(product)
    {
      let count=1;
      cartproducts.forEach((val)=>{
        if(val.title===product.title)
          count=val.count-1})
      dispatch(removeProductsFromCart(product,count))
      return count
    }
    function checkincart(prod)
    {
      let res=cartproducts.some((val)=>val.id===prod)
      return res;
    }
  if(item.id)
  return (
    <>
   <div className="eachitem-container">
        <div className='imgcontainer'>{item.id}
        <img id="images" className="card-img-top" src={item.image} alt="Card image cap" />
        </div>
        <div className="desccontainer">
          <h2 className="card-title" style={{ fontWeight: 700}}>{item.title.substring(0, 20)}</h2>
          <h3 style={{fontWeight: 800, color: 'blue'}}>INR.{item.price}</h3>
          <p >{item.description}</p>
          <button className="btn btn-primary" style={{fontSize: "15px",}} onClick={function()
          {
             addToTheCart(item)
          }}>ADD TO CART</button>
          <br></br>
          {checkincart(item.id)&&<DisplayPlusAndMinus cartprod={{val:item,cartproducts}} addToTheCart={addToTheCart} removeFromCart={removeFromCart}/>}
        </div>
      </div>
      </>
  );
  else
  {
    return(
    <div>
        <h1>Loading . . . </h1>
    </div>
    )
  }
}

export default EachItem