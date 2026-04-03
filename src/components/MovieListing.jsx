import MovieCard from './MovieCard'

const MovieListing = ({movies}) => {
  return (
    <div className="lg:px-14 py-12 flex gap-x-6 gap-y-10 flex-wrap">
    {
      movies.map((movie)=><MovieCard key={movie.id} id={movie.id} movie={movie}/>)
    }
    </div>
  )
}

export default MovieListing
