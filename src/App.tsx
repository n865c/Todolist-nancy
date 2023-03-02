import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from '@mui/material';
import {Header } from './components/header';
import {Outlet} from 'react-router-dom';
import Container from '@mui/material/Container';
function App() {
  return (
    <Container maxWidth="sm">
     <Header/>
     <main>
      <Outlet/>
     </main>
     <footer>&copy; 2023</footer>
    </Container>
  );
}

export default App;
