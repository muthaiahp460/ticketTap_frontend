import ShimmerMovieCard from "./ShimmerMovieCard";

const ShimmerMovieList = () => {
  return (
    <div className="lg:px-16 py-12 flex gap-x-6 gap-y-10 flex-wrap px-5">
      {[...Array(8)].map((_, i) => (
        <ShimmerMovieCard key={i} />
      ))}
    </div>
  );
};

export default ShimmerMovieList;