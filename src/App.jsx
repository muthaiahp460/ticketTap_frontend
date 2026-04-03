import "./App.css"
import Home from "./Home"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Page from "./Page"
import ShimmerCard from "./ShimmerCard";
function App() { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/movie/:id" element={<Page/>}></Route>
        <Route path="/shimmer" element={<ShimmerCard/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
