import { useNavigate } from 'react-router'
const MovieCard = ({id,movie}) => {
  const navigate=useNavigate()
  return (
    <div onClick={()=>navigate(`movie/${id}`)} className="w-[170px] lg:w-[208px] rounded-2xl shadow-md overflow-hidden group cursor-pointer">
        <div className="h-[200px] lg:h-[260px] overflow-hidden">
            <img src={movie.movieImg} className="w-full  h-full  duration-500 group-hover:scale-110"></img>
            </div>
            <div className="px-3 pt-2 pb-3">
            <h1 className="text-lg font-bold hover:text-amber-200">{movie.name}</h1>
            <div>
                <span className="text-sm font-semibold">{movie.certificate} | {movie.language}</span>
            </div>
        </div>
    </div>
  )
}

export default MovieCard
