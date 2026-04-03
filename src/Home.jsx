import { useState,useEffect } from 'react'
import Navbar from './Navbar.jsx' 
import MovieListing from './components/MovieListing.jsx'
import SearchOverlay from './components/SearchOverlay.jsx'
import { useMovies } from './hooks/useMovies.jsx'

const Home = () => {
  const [search,setSearch]=useState("")
  const movies=useMovies("")
  const searchedMovies=useMovies(search)
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar search={search} setSearch={setSearch}/>
      {search.length>0 && <SearchOverlay movies={searchedMovies}/>}
      {search.length<=0 && <MovieListing movies={movies}/>}
    </div> 
  )
}

export default Home
