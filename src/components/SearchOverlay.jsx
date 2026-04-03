import { TbMovie } from "react-icons/tb";
import { useNavigate } from "react-router";
const SearchOverlay = ({movies}) => {
  const navigate=useNavigate()
  return (
    <div className=' bg-white backdrop:blur-2xl mx-56 border-1 border-gray-200 rounded-xl shadow-2xl w-150 overflow-hidden hover:cursor-pointer'>
    {
        movies.map((movie)=>{
            return <div key={movie.id} className='p-3.5 border-b-1 border-gray-300 w-150 shadow-2xs flex justify-between hover:bg-gray-100 transition cursor-pointer' onClick={()=>{navigate(`/movie/${movie.id}`)}}>
                        <span>{movie.name}</span>
                          <TbMovie size={22}/>
                    </div>
            })
    }
    </div>
  )
}

export default SearchOverlay
