import { useEffect, useState } from "react";
import MovieCard from './MovieCard'
import ShimmerMovieList from '../../Shimmer/ShimmerMovieList'

const MovieListing = ({ movies }) => {
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    if (!movies) return;

    const start = Date.now();

    const elapsed = Date.now() - start;
    const remaining = 500 - elapsed;

    const timer = setTimeout(() => {
      setShowData(true);
    }, remaining > 0 ? remaining : 0);

    return () => clearTimeout(timer);
  }, [movies]);

  if (!showData) {
    return <ShimmerMovieList />;
  }

  return (
    <div className="lg:px-16 py-12 flex gap-x-6 gap-y-10 flex-wrap px-5">
      {
        movies.map((movie) => (
          <MovieCard key={movie.id} id={movie.id} movie={movie} />
        ))
      }
    </div>
  )
}

export default MovieListing