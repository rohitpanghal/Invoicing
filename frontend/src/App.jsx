import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import USDDetails from './Invoiceing/USDDetails'
import { Route, Routes, useNavigate } from 'react-router-dom'
import InvoiceMangement from './Invoiceing/InvoiceMangement'
import LoginPage from './Login'


function App() {
  const navigate= useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/")
    }
  },[navigate])



  return(
    <>
 <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/usddetails" element={<USDDetails />} />
        <Route path="/invoice-mangement" element={<InvoiceMangement />} />
      </Routes>

    </>
  )
}

export default App
