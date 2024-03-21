import React from 'react'
import { signInWithPopup,GoogleAuthProvider } from 'firebase/auth'
import { auth } from './Firebase'
import { useNavigate } from 'react-router-dom'

function Googleauth() {
     
    const provider=new GoogleAuthProvider()
    const navigate=useNavigate()
    provider.setCustomParameters({   
        prompt : "select_account "
    });
 const signInWithgoogle=()=>signInWithPopup(auth,provider).then((result)=>{
    
   const username=result.user.displayName;
   if(username)
   localStorage.setItem("UserName", username);
    navigate("/shoppingmain");
}
)
  return (

   <>
   <div className='GoogleAuth'>
      <button
        type="button"
        className="btn btn-light border-white"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          padding: '10px',
          cursor: 'pointer',
        }}
        onClick={signInWithgoogle}
      >
        <i className="fa-brands fa-google" style={{color: '#dc5a4c',fontSize:'larger',marginRight:'10px'}}></i>
        Sign in with Google
      </button>
    </div>
   </>
  )
}

export default Googleauth