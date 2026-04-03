
const MovieBanner = ({movie}) => {
  return (
    <div className="flex flex-col gap-6 pb-4">
        <div className="flex px-70 pt-10">
            <div className="h-[195px] w-[140px]">
                <img src={movie.movieImg} className="h-full w-full rounded-2xl"></img>
            </div>
            <div className="my-10 mx-6">
                <h1 style={{ fontFamily: 'Inter, sans-serif' }}className="text-3xl font-semibold ">{movie.name}</h1>
                <div className="my-4 flex gap-2">
                    <span className="text-sm text-gray-600 px-1">{movie.certificate} | {movie.language} | {movie.genre} | {`${Math.floor(movie.duration/60)}hr ${Math.floor(movie.duration%60)}min`}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MovieBanner
