const ShimmerBanner = () => {
  return (
    <div className="relative h-[420px] sm:h-[500px] overflow-hidden bg-gray-100">

      {/* Background shimmer */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-200"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col sm:flex-row items-center justify-center sm:justify-between px-4 sm:px-5 gap-4 sm:gap-0">

        {/* Poster */}
        <div className="relative w-[130px] sm:w-[260px] h-[180px] sm:h-[350px] rounded-xl overflow-hidden order-1 sm:order-2">
          <div className="absolute inset-0 bg-gray-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]"></div>
        </div>

        {/* Text */}
        <div className="max-w-md sm:max-w-lg w-full space-y-3 order-2 sm:order-1">

          <div className="relative h-6 sm:h-10 w-3/4 rounded overflow-hidden">
            <div className="absolute inset-0 bg-gray-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>

          <div className="relative h-4 w-1/2 rounded overflow-hidden">
            <div className="absolute inset-0 bg-gray-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>

          <div className="space-y-2">
            <div className="relative h-3 w-full rounded overflow-hidden">
              <div className="absolute inset-0 bg-gray-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]"></div>
            </div>

            <div className="relative h-3 w-5/6 rounded overflow-hidden">
              <div className="absolute inset-0 bg-gray-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>

          <div className="relative h-10 w-32 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gray-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ShimmerBanner;