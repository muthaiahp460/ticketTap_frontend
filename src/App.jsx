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
function App() { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/movie/:id" element={<Page/>}></Route>
        <Route path="/shimmer" element={<ShimmerCard/>}></Route>
        <Route path="/show/:id/seatLayout" element={<SeatLayout/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/admin/dashboard" element={<Dashboard/>}></Route>
        <Route path="/admin/dashboard/screens/:theaterId" element={<ViewScreens/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
