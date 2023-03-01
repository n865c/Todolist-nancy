import React, { useState } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup,User } from "firebase/auth";
import Button from '@mui/material/Button';
const provider = new GoogleAuthProvider();
const auth = getAuth();
export const LoginPage= () => {
  const [user,setuser]=useState<User | null>(null);
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
  }
  return (
    <div>
    <Button variant="text" onClick={signInWithGoogle}>Login</Button>
    
    {user && <h1>{user.displayName}</h1>}
    </div>
  )
}
