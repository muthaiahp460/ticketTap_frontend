import React from "react";

const Banner = ({ movie }) => {
  return (
    <div className="relative h-[500px] overflow-hidden bg-white text-black">
      
      {/*  Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={movie.banner}
          alt=""
          className="w-full h-full object-cover object-center blur-[25px] scale-110"
        />
      </div>

      {/*  Horizontal Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to right,
              rgba(255,255,255,0.95) 0%,
              rgba(255,255,255,0.85) 25%,
              rgba(255,255,255,0.6) 45%,
              rgba(255,255,255,0.2) 65%,
              rgba(255,255,255,0) 100%
            )
          `,
        }}
      />

      {/*  Content */}
      <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center justify-between px-5">
        
        {/* LEFT */}
        <div className="max-w-lg">
          <h1 className="text-[40px] font-semibold mb-2">
            {movie.title}
          </h1>

          <p className="opacity-80 mb-2">
            {movie.genre}
          </p>

          <p className="mb-5 leading-relaxed">
            {movie.desc}
          </p>

          <button className="px-6 py-3 rounded-xl bg-black text-white">
            Book Now
          </button>
        </div>

        {/* RIGHT */}
        <img
          src={movie.poster}
          alt="poster"
          className="w-[260px] rounded-xl shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Banner;