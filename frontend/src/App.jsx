import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './pages/components/Navbar';
import Home from './pages/home/Home';

function App() {

  return (
    <>
    <BrowserRouter>  
    <Navbar/> 
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
