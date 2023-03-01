import React, { ChangeEvent, useState } from 'react'
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup,User } from "firebase/auth";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
const provider = new GoogleAuthProvider();
const auth = getAuth();
export const LoginPage= () => {
  const [user,setuser]=useState<User | null>(null);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const setEmailValue=(event:ChangeEvent<HTMLInputElement>)=>{
    setEmail(event.target.value);
  };
  const setPasswordValue=(event:ChangeEvent<HTMLInputElement>)=>{
    setPassword(event.target.value);
  }
  const signInWithGoogle=()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    setuser(user);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    console.log(error);
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  };
  const signUp=()=>{
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setuser(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  };
  const loginInWithEmailAndPassword=()=>{
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setuser(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  };
  return (
    <div>
      <TextField id="filled-basic" 
      value={email}
      onChange={setEmailValue}
      label="Email" 
      variant="filled" />
      <TextField id="filled-basic" 
      label="Password"  
      value={password} 
      type="password"
      onChange={setPasswordValue}
      variant="filled" />
      <Button variant="text" onClick={signUp}>
        Signup
      </Button>
    <Button variant="text" onClick={loginInWithEmailAndPassword}>Login</Button>
    <Button variant="text" onClick={signInWithGoogle}>Login with goggle</Button>
    {user && <h1>{user.displayName}</h1>}
    </div>
  )

  }

