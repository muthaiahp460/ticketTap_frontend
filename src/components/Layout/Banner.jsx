import React from "react";
import { useNavigate } from "react-router";

const Banner = ({ movie }) => {
  const navigate=useNavigate()
  return (
    <div className="relative h-[420px] sm:h-[500px] overflow-hidden bg-white text-black">
      
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={movie.banner}
          alt=""
          className="w-full h-full object-cover object-center blur-[20px] sm:blur-[25px] scale-110"
        />
      </div>

      {/* Gradient */}
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

      {/* Content */}
      <div className="
        relative z-10 
        max-w-6xl mx-auto 
        h-full 
        flex flex-col sm:flex-row 
        items-center justify-center sm:justify-between 
        px-4 sm:px-5 
        gap-4 sm:gap-0
      ">

        {/* POSTER (TOP on mobile) */}
        <img
          src={movie.poster}
          alt="poster"
          className="
            w-[130px] sm:w-[260px]
            rounded-xl shadow-2xl
            order-1 sm:order-2
          "
        />

        {/* TEXT CONTENT */}
        <div className="
          max-w-md sm:max-w-lg
          text-center sm:text-left
          order-2 sm:order-1
        ">
          <h1 className="text-2xl sm:text-[40px] font-semibold mb-2">
            {movie.title}
          </h1>

          <p className="text-sm sm:text-base opacity-80 mb-2">
            {movie.genre}
          </p>

          <p className="text-sm sm:text-base mb-4 sm:mb-5 leading-relaxed">
            {movie.desc}
          </p>

          {/* CTA (NOW BELOW TEXT) */}
          <button className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-black text-white text-sm sm:text-base hover:cursor-pointer"
          onClick={()=>navigate(`/movie/${movie.movieId}`)}>
            Book Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default Banner;