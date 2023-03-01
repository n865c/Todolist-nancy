import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from '@mui/material';
import {Header } from './components/header';
import {Outlet} from 'react-router-dom';
function App() {
  return (
    <div className="container">
     <Header/>
     <main>
      <Outlet/>
     </main>
     <footer>&copy; 2023</footer>
    </div>
  );
}

export default App;
