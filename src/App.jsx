import "./App.css"
import Home from "./Pages/Home/Home"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SeatLayout from "./Pages/Booking/SeatLayout";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Dashboard from "./Pages/Admin/Dashboard";
import ViewScreens from "./components/Theater/ViewScreens";
import SeatLayouts from "./components/Booking/SeatLayouts";
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";
import PaymentPage from "./Pages/Payment/PaymentPage";
import SuccessPage from "./Pages/Payment/SuccessPage";
import OrdersPage from "./Pages/Orders/OrdersPage";
import MovieDetails from "./Pages/Movies/MovieDetails";
import Scanner from "./components/Scanner";
import AuthCallback from "./components/Auth/Callback";
function App() { 
  const [user,setUser]=useState({})
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/movie/:id" element={<MovieDetails/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/auth/callback" element={<AuthCallback/>}></Route>
        
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
          {/*<Route path="/admin/scan" element={<Scanner/>}></Route>*/}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
