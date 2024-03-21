import React from 'react'
import '../Styling/login.css'
import { useNavigate } from 'react-router-dom'

import Googleauth from '../Firebase/Googleauth'

const Login = () => {
  const navigate=useNavigate();
  const [user,setUser]=React.useState({});
  const setDetails=(event)=>setUser({...user,[event.target.name]:event.target.value});

  const submitLogin=()=>{
    if(user.username)
      localStorage.setItem("UserName", user.username);
    navigate("/shoppingmain");
  }
  
  return (
    <div className="cardLogin" style={{padding:'20px', width:'fit-content'}}>
        <h4>Login:</h4>
        <div className="mb-3">
            <label htmlFor="inputloginusername" className="form-label">User name</label>
            <input type="email" className="form-control" id="inputloginusername" style={{width:'100%'}}
            name='username' value={user.username} 
            onChange={setDetails}/>
        </div>
        <div className="mb-3">
            <label htmlFor="inputloginpassword" className="form-label" >Password</label>
            <input type="password" className="form-control" id="inputloginpassword" style={{width:'100%'}}
             name='password' value={user.password}
             onChange={setDetails}
            />
        </div>
        <button onClick={submitLogin} style={{marginBottom:"20px"}} className="btn btn-primary">Submit</button>
        <div className="line"><span>or</span></div>
        <Googleauth/>
    </div>
  )
}

export default Login