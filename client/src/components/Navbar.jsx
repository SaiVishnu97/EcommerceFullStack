import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import CartModal from './CartModal'
import { useState } from 'react'
import { searchMatchedItems } from '../redux'
import { Link, useNavigate,useSearchParams } from 'react-router-dom'

function Navbar() {
  const cartproducts = useSelector(output => output.product.cart);
  const [show, setShow] = useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [searcheditem,setSearchedItem]=useState('');
  const [,setSearchQuery]=useSearchParams();
  const countitems = () => cartproducts.reduce((acc, val) => acc + val.count, 0);
  function searchItemsFunc(event)
  {
    // event.preventDefault();
    if(event.key==='Enter')
    {
      event.preventDefault();

      dispatch(searchMatchedItems(searcheditem));
      setSearchQuery({items:searcheditem});
    }
  }
  const onHandleChange=(event)=>{
    const result = event.target.value.replace(/[^a-z]/gi, '');
    setSearchedItem(result);
  }
  return (
    <div >
      
    <div  className='NavBarClass'>
        <div>
          <Link style={{color:'whitesmoke',textDecoration:'none'}} to='/shoppingmain' > <i className="fa-solid fa-house" style={{color: '#ededed'}}></i> Home <span className="sr-only">(current)</span></Link>
        </div>
        <div>
          <Link style={{color:'whitesmoke', textDecoration:'none'} } to='/shoppingmain'>All Products</Link>
        </div>
      <div>
      <form className="form-inline my-2 my-lg-0" >
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searcheditem} onChange={onHandleChange} onKeyPress={(event)=>searchItemsFunc(event)}/>
      </form>
      </div>
    <div>
            <i
              className="fa fa-shopping-cart"
              style={{ fontSize: '30px', cursor: 'pointer', color:'whitesmoke'}}
              onClick={() => setShow(true)}
            ></i>
            <span className="badge badge-warning"  id="lblCartCount">
              {' '}
              {countitems()}{' '}
            </span>
    </div>
    <div>
    <a className="nav-link" onClick={()=>{
      localStorage.removeItem('UserName');
      navigate('/');
      }} style={{color:'whitesmoke'}} >Log out</a>
    </div>
    </div>

<CartModal show={show} setShow={setShow} />
</div>
  )
}

export default Navbar