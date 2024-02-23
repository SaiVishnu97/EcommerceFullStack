import React from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import { addProductsToCart,removeProductsFromCart } from '../redux'
import { DisplayPlusAndMinus } from './Shoppingbody';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PaymentReact from './PaymentReact';

function CartModal(props) {
 
    const cartproducts=useSelector((output)=>{return output.product.cart;})
    const dispatch=useDispatch()
   
    const handleClose = () => props.setShow(false);
  
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
  return (
    <div>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-with-blur"
      >
        <Modal.Header closeButton>
          <Modal.Title>Cart Items</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: 'auto' }}>
        {cartproducts.length===0?`Your cart is empty`:cartproducts.map((val)=>
      {
        return <div className="card" style={{fontSize: "10px",}}>
        <h6>{val.id}</h6>
        <img id="images" className="card-img-top" style={{height:"150px"}}src={val.image} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title" style={{fontSize: "10px", fontWeight: 700}}>{val.title.substring(0, 20)}</h5>
          <h6 style={{fontWeight: 800}}>INR.{val.price}</h6>
          <p className="card-text">{val.description.substring(0, 80)}</p>
          <h6 style={{fontWeight: 800}}>Total Price:-INR.{val.price*val.count}</h6>
          <br></br>
          <DisplayPlusAndMinus cartprod={{val,cartproducts}} addToTheCart={addToTheCart} removeFromCart={removeFromCart}/>
        </div>
      </div>
})
    }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <PaymentReact></PaymentReact>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CartModal