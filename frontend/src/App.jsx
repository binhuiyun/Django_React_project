import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Calculator from './pages/Calculator';
import 'bootstrap/dist/css/bootstrap.min.css';
import CurrencyConverter from './pages/CurrencyConverter';


function Logout(){
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register />
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>       
          
        } />
        <Route path = "/calculator" element={<Calculator />} />
        <Route path="/currency" element={<CurrencyConverter />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
