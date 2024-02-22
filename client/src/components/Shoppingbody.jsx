import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate,useSearchParams } from 'react-router-dom'
import { addProductsToCart,removeProductsFromCart } from '../redux'
function Shoppingbody() {

    const cartproducts=useSelector((output)=>{return output.product.cart;});
    const fullproducts=useSelector(output=>output.product.products);
    const matcheditems=useSelector(output=>output.product.matcheditems);
   // console.log(cartproducts,fullproducts,matcheditems);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [searchitems,setSearchedItems]=useSearchParams();
   // console.log(searchitems.get('items'));
    function checkincart(prod)
    {
      let res=cartproducts.some((val)=>val.id===prod)
   //   console.log(res)
      return res;
    }

     function addToTheCart(product)
    {
      let count=1;
      cartproducts.forEach((val)=>{
        if(val.title===product.title)
          count=val.count+1})
      //console.log(count)
      dispatch(addProductsToCart(product,count))
      return count
    }
    function removeFromCart(product)
    {
      let count=1;
      cartproducts.forEach((val)=>{
        if(val.title===product.title)
          count=val.count-1})
      //console.log(count)
      dispatch(removeProductsFromCart(product,count))
      return count
    }
    function goToItem(val,event)
    {
   //    console.log(event.target);
       if(event.target.classList.contains('cartevent'))
       return;
       navigate(`${val.id}`);
    }


    if(searchitems.size>0&&matcheditems.length===0)
      setSearchedItems();


  if(searchitems.get('items')&&matcheditems.length>0)
  {
    return (
      <div className='outer'>
        {matcheditems.map((val)=>
        {
          return <div className="card" onClick={(event)=>goToItem(val,event)} style={{fontSize: "10px",}}>
          <h6>{val.id}</h6>
          <img id="images" className="card-img-top" style={{height:"150px"}} src={val.image} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title" style={{fontSize: "10px", fontWeight: 700}}>{val.title.substring(0, 20)}</h5>
            <h6 style={{fontWeight: 800}}>INR.{Math.floor(val.price * 85)}</h6>
            <p className="card-text">{val.description.substring(0, 80)}</p>
            <button className="btn btn-primary cartevent" style={{fontSize: "15px",}} onClick={function(event)
            {
               addToTheCart(val)
            }}>ADD TO CART</button>
            <br></br>
            {checkincart(val.id)&&<DisplayPlusAndMinus cartprod={{val,cartproducts}} addToTheCart={addToTheCart} removeFromCart={removeFromCart}/>}
          </div>
        </div>
  })
      }
      </div>
    )
  }
  return (
    <div className='outer'>
      {fullproducts.map((val)=>
      {
        return <div key={val.id} className="card" onClick={(event)=>goToItem(val,event)} style={{fontSize: "10px",}}>
        <h6>{val.id}</h6>
        <img id="images" className="card-img-top" style={{height:"150px"}} src={val.image} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title" style={{fontSize: "10px", fontWeight: 700}}>{val.title.substring(0, 20)}</h5>
          <h6 style={{fontWeight: 800}}>INR.{Math.floor(val.price * 85)}</h6>
          <p className="card-text">{val.description.substring(0, 80)}</p>
          <button className="btn btn-primary cartevent" style={{fontSize: "15px",}} onClick={function(event)
          {
             addToTheCart(val)
          }}>ADD TO CART</button>
          <br></br>
          {checkincart(val.id)&&<DisplayPlusAndMinus cartprod={{val,cartproducts}} addToTheCart={addToTheCart} removeFromCart={removeFromCart}/>}
        </div>
      </div>
})
    }
    </div>
  )
}

export function DisplayPlusAndMinus({cartprod,addToTheCart,removeFromCart})
{
  let count
  cartprod.cartproducts.forEach((val1)=>{
    if(cartprod.val.id===val1.id)
    count=val1.count
  })

  return(<div style={{marginTop:"10px"}}>  <button type="button" onClick={()=>removeFromCart(cartprod.val)} className="btn btn-outline-success cartevent">-</button>
          <div className="count-display" ><h6 style={{fontWeight: 800}}>{count}</h6></div>
          <button type="button" className="btn btn-outline-success cartevent" onClick={()=>{
            addToTheCart(cartprod.val)}}>+</button>
          </div>)

}
export default Shoppingbody
