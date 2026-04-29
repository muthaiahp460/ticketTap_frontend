const Block = ({ className }) => (
  <div className={`relative overflow-hidden rounded ${className}`}>
    <div className="absolute inset-0 bg-gray-200"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2.5s_infinite]"></div>
  </div>
);

const ShimmerMoviePage = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl px-3 sm:px-6 lg:px-8 space-y-6">

        {/* Banner */}
        <div className="flex gap-4 sm:gap-6">
          <Block className="w-[110px] h-[160px] sm:w-[140px] sm:h-[195px]" />
          <div className="flex flex-col gap-3 w-full">
            <Block className="h-6 sm:h-8 w-3/4" />
            <Block className="h-4 w-1/2" />
          </div>
        </div>

        {/* Date strip */}
        <div className="flex gap-3 overflow-x-auto">
          {[1,2,3,4,5].map(i => (
            <Block key={i} className="h-10 w-16 rounded-full flex-shrink-0" />
          ))}
        </div>

        {/* Theater rows */}
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="space-y-2">
              <Block className="h-4 w-1/3" />
              <div className="flex gap-2 flex-wrap">
                {[1,2,3,4].map(j => (
                  <Block key={j} className="h-8 w-16 rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="bg-gray-200 rounded-lg py-3 px-4 flex gap-6">
          <Block className="h-4 w-20" />
          <Block className="h-4 w-24" />
          <Block className="h-4 w-16" />
        </div>

        {/* Showtime */}
        <div className="space-y-3">
          <Block className="h-5 w-1/4" />
          {[1,2,3].map(i => (
            <Block key={i} className="h-10 w-full" />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ShimmerMoviePage;