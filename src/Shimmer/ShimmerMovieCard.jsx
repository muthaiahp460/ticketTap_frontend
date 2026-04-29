const ShimmerMovieCard = () => {
  return (
    <div className="w-[170px] lg:w-[208px] rounded-2xl shadow-md overflow-hidden animate-pulse">
      
      {/* Image shimmer */}
      <div className="h-[200px] lg:h-[260px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>

      {/* Text shimmer */}
      <div className="px-3 pt-2 pb-3 space-y-2">
        <div className="h-4 rounded w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
        <div className="h-4 rounded w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
      </div>

    </div>
  );
};

export default ShimmerMovieCard;