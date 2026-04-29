import { useState,useEffect } from 'react'
import Navbar from '../../components/Layout/Navbar.jsx' 
import MovieListing from '../../components/Movie/MovieListing.jsx'
import SearchOverlay from '../../components/Layout/SearchOverlay.jsx'
import { useMovies } from '../../hooks/useMovies.jsx'
import Banner from '../../components/Layout/Banner.jsx'
import BannerContainer from '../../components/Layout/BannerContainer.jsx'

const Home = () => {
  const [search,setSearch]=useState("")
  const movies=useMovies("")
  const searchedMovies=useMovies(search)
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar search={search} setSearch={setSearch}/>
      <BannerContainer/>
      {search.length>0 && <SearchOverlay movies={searchedMovies}/>}
      {search.length<=0 && <MovieListing movies={movies}/>}
    </div> 
  )
}

export default Home
