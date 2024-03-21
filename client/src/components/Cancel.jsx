import React from 'react'
import { useNavigate } from 'react-router-dom';
const Cancel = () => {

    const [count,setCount]=React.useState(5);
    const intervalref=React.useRef(null);
    const navigate=useNavigate();
    React.useEffect(()=>{
       intervalref.current=setInterval(()=>setCount(prevCount => {
        if (prevCount === 1) {
            clearInterval(intervalref.current);
            navigate('/shoppingmain');
            return prevCount;
        } else {
            return prevCount - 1;
        }
    }),1000);
    
       return ()=>{
        clearInterval(intervalref.current);
       }
    },[])
   
  return (
    <div><h1>Payment cancelled... Redirecting you to the homepage in {count}</h1></div>
  )
}

export default Cancel