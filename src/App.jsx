import "./App.css"
import Home from "./Home"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Page from "./Page"
import ShimmerCard from "./ShimmerCard";
import SeatLayout from "./SeatLayout";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./Dashboard";
import ViewScreens from "./components/ViewScreens";
import SeatLayouts from "./components/SeatLayouts";
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";
import PaymentPage from "./components/PaymentPage";
import SuccessPage from "./SuccessPage";
import OrdersPage from "./components/OrdersPage";
function App() { 
  const [user,setUser]=useState({})
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/movie/:id" element={<Page/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/shimmer" element={<ShimmerCard/>}></Route>
        
        <Route element={<ProtectedRoute user={user} setUser={setUser} role={"user"}/>}>
          <Route path="/show/:id/seatLayout" element={<SeatLayout/>}></Route>
          <Route path="/payment/:bookingId" element={<PaymentPage/>}></Route>
          <Route path="/success/:bookingId" element={<SuccessPage/>}></Route>
          <Route path="/orders" element={<OrdersPage/>}></Route>
        </Route>
        <Route element={<ProtectedRoute user={user} setUser={setUser} role={"admin"}/>}>
          <Route path="/admin/dashboard" element={<Dashboard/>}></Route>
          <Route path="/admin/dashboard/screens/:theaterId" element={<ViewScreens/>}></Route>
          <Route path="/admin/seat/:screenId" element={<SeatLayouts/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
