import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import axios from "axios";

const BannerContainer = () => {
  const [movies,setMovies]=useState([])
  useEffect(() => {
    const func=async(req,res)=>{
      const result=await axios.get("http://localhost:3000/movies/trending")
      setMovies(result.data.data)
    }
    func()
  },[])


  const extended = [...movies, ...movies];

  const [index, setIndex] = useState(0);
  const [isTransition, setIsTransition] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (index === movies.length) {
      setTimeout(() => {
        setIsTransition(false);
        setIndex(0);
        setTimeout(() => setIsTransition(true), 50);
      }, 800);
    }
  }, [index, movies.length]);

  const realIndex = index % movies.length;

  const nextSlide = () => setIndex((prev) => prev + 1);

  const prevSlide = () => {
    if (index === 0) {
      setIsTransition(false);
      setIndex(movies.length);
      setTimeout(() => {
        setIsTransition(true);
        setIndex(movies.length - 1);
      }, 50);
    } else {
      setIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative overflow-hidden w-full">

      {/* LEFT ARROW */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 text-white text-lg sm:text-xl flex items-center justify-center"
      >
        ‹
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 text-white text-lg sm:text-xl flex items-center justify-center"
      >
        ›
      </button>

      {/* SLIDER (UNCHANGED LOGIC) */}
      <div
        className={`flex ${
          isTransition ? "transition-transform duration-700 ease-in-out" : ""
        }`}
        style={{
          width: `${extended.length * 100}%`,
          transform: `translateX(-${index * (100 / extended.length)}%)`,
        }}
      >
        {extended.map((movie, i) => (
          <div key={i} className="w-full">
            <Banner movie={movie} />
          </div>
        ))}
      </div>

      {/* DOTS */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
        {movies.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`cursor-pointer transition-all duration-300 rounded-full
              ${i === realIndex
                ? "w-4 sm:w-5 h-1.5 sm:h-2 bg-black"
                : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gray-400"
              }
            `}
          />
        ))}
      </div>

    </div>
  );
};

export default BannerContainer;