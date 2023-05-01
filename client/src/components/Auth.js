import React, { useState } from "react";
import { Cookies, useCookies } from "react-cookie";

const Auth = () => {
  const [isLogIn, setisLogIn] = useState(true);
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);
  const [ConfirmPassword, setConfirmPassword] = useState(null);
  const [error, seterror] = useState(null);
  const [Cookie, setCookie , removeCookies] = useCookies(null)
  
  // console.log(Email,Password,ConfirmPassword)
  console.log(Cookie)
  const viewLogin = (status) => {
    seterror(null);
    setisLogIn(status);
  };
  const handelSubmit=async(e , endpoint) => {
    e.preventDefault()
    if (!isLogIn && Password!==ConfirmPassword) {
       seterror("Make sure password match!")
        
      return
    }
    console.log(endpoint);
    const response=await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({Email , Password})
    });
    const data = await response.json();
    if (response.status === 400) {
      seterror(data.error);
              
      return
      
    }
    else {
      seterror("user created")
      setCookie('Email' , data.Email)
      setCookie('AuthToken' ,  data.token)
      window.location.reload()
    }
    console.log(data);
  }
  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogIn ? "please log in " : "please sign up "}</h2>
          <input type="email" placeholder="Email" 
          onChange={(e) =>  setEmail(e.target.value)}/>
          <input type="password" placeholder="password"
          onChange={(e) =>  setPassword(e.target.value)} />
          {!isLogIn && <input type="password" placeholder="confirm password"
          onChange={(e) =>  setConfirmPassword(e.target.value)} />}
          <input type="submit" className="create" 
          onClick={(e) => handelSubmit(e ,isLogIn?'login' : 'signup' ) }/>
        {error != null && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{
              background: !isLogIn ? "rgb(255,255,255) " : "rgb(188,188,188)",
            }}
          >
            SignUp
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{
              background: isLogIn ? "rgb(255,255,255) " : "rgb(188,188,188)",
            }}
          >
            LogIn
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default Auth;
