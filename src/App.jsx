import "./App.css"
import Home from "./Home"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Page from "./Page"
import ShimmerCard from "./ShimmerCard";
import SeatLayout from "./SeatLayout";
function App() { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/movie/:id" element={<Page/>}></Route>
        <Route path="/shimmer" element={<ShimmerCard/>}></Route>
        <Route path="/show/:id/seatLayout" element={<SeatLayout/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
