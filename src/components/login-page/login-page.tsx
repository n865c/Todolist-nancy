import React, { ChangeEvent, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import Card from '@mui/material/Card';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AuthContext } from "../../providers/auth";
import { CardActions, CardContent } from "@mui/material";
const provider = new GoogleAuthProvider();
const auth = getAuth();
export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const setEmailValue = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const setPasswordValue = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        if (user && setUser) {
          setUser(user);
        }

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
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
  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user && setUser) {
          setUser(user);
      }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  const loginInWithEmailAndPassword = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user && setUser) {
          setUser(user);
      }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <Card>
        <CardContent sx={{'& .MuiTextfield-root':{mb:2}}}>
      <TextField
        id="filled-basic"
        value={email}
        onChange={setEmailValue}
        fullWidth
        label="Email"
        variant="filled"
      />
      <TextField
        id="filled-basic"
        label="Password"
        value={password}
        type="Password"
        onChange={setPasswordValue}
        fullWidth
        variant="filled"
      />
      </CardContent>
      <CardActions>
      <Button color="secondary" variant="text" onClick={signUp}>
        Signup
      </Button>
      <Button variant="text" onClick={loginInWithEmailAndPassword}>
        app Login
      </Button>
      <Button variant="text" onClick={signInWithGoogle}>
        Login with goggle
      </Button>
      </CardActions>
    </Card>
  );
};
