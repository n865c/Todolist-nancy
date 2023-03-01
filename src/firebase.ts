// import { initializeApp } from "firebase/app";
// import { getFirestore} from 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyCTQvWqZszajjBgfZ4Bf7wlfzaCZR04UyU",
//     authDomain: "react-firebase-766fe.firebaseapp.com",
//     projectId: "react-firebase-766fe",
//     storageBucket: "react-firebase-766fe.appspot.com",
//     messagingSenderId: "369631526058",
//     appId: "1:369631526058:web:9b4c8adf6b233fa7f664d3"
//   };
//   const app = initializeApp(firebaseConfig);
//   export const db=getFirestore(app);
// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: 'AIzaSyCANLXrKwfYVV9OTvCvVqgVa6BY8fgISnA',
//     authDomain: 'todo-list-with-user-auth.firebaseapp.com',
//     projectId: 'todo-list-with-user-auth',
//     storageBucket: 'todo-list-with-user-auth.appspot.com',
//     messagingSenderId: '1026718802949',
//     appId: '1:1026718802949:web:6bdf32a87196bdb016e86c',
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTQvWqZszajjBgfZ4Bf7wlfzaCZR04UyU",
  authDomain: "react-firebase-766fe.firebaseapp.com",
  projectId: "react-firebase-766fe",
  storageBucket: "react-firebase-766fe.appspot.com",
  messagingSenderId: "369631526058",
  appId: "1:369631526058:web:9b4c8adf6b233fa7f664d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);