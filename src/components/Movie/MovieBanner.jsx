
const MovieBanner = ({ movie }) => {
  return (
    <div className="w-full px-3 sm:px-6 lg:px-12 pt-6 pb-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">

        {/* Poster */}
        <div className="w-[110px] h-[160px] sm:w-[140px] sm:h-[195px] flex-shrink-0">
          <img
            src={movie.movieImg}
            alt={movie.name}
            className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center gap-2">

          {/* Title */}
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-semibold leading-tight">
            {movie.name}
          </h1>

          {/* Info Row */}
          <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {movie.certificate} • {movie.language} • {movie.genre} •{" "}
            {movie.duration
  ? `${Math.floor(movie.duration / 60)}h ${Math.floor(movie.duration % 60)}m`
  : ""}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MovieBanner;