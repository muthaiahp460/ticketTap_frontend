import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Navbar from './Navbar.jsx' 
import MovieListing from './components/MovieListing.jsx'
import SearchOverlay from './components/SearchOverlay.jsx'

const Home = () => {
  const navigate=useNavigate()
  const [movies,setMovies]=useState([])
  const [search,setSearch]=useState("")
  const [searchedMovies,setsearchedMovies]=useState([]);
  const getMovies=()=>{
    axios.get("http://localhost:3000/movies").then(
      (res)=>{setMovies(res.data.data)
        console.log(movies)}
    ).catch(
      err=>console.log(err)
    )
  }

  useEffect(()=>{
    const fetchMovies=async()=>{
    try{
        
        const result=await axios.get("http://localhost:3000/movies",{
            params:{
            name:search
            }
        })
        setsearchedMovies(result.data.data)
        console.log(searchedMovies)
        }
    catch(err){
        console.log(err)
    }
    }
    fetchMovies()
  },[search])

  useEffect(getMovies,[])
  return (
    
    <div className="min-h-screen bg-slate-50">
      <Navbar search={search} setSearch={setSearch}/>
      {search.length>0 && <div>
          <SearchOverlay movies={searchedMovies}/>
        </div>}
      {search.length<=0 && <div>
        <MovieListing movies={movies}/>
      </div>
      }
    </div> 
  )
}

export default Home
