import React, { useEffect, useState } from "react";
import Banner from "./Banner";

const BannerContainer = () => {
  const movies = [
    {
      title: "LIK: Love Insurance Kompany",
      genre: "UA13+ | Romance, Comedy +1 more",
      desc: "A man who believes in traditional ideas of love crosses paths with Dheema.",
      banner:
        "https://cdn.district.in/movies-assets/images/cinema/LIK-new-eb95c3a0-3335-11f1-b177-83aef5e0b8cb.jpg",
      poster:
        "https://cdn.district.in/movies-assets/images/cinema/LIK-new-eb95c3a0-3335-11f1-b177-83aef5e0b8cb.jpg",
    },
    {
      title: "Vaazha II",
      genre: "UA13+ | Comedy, Drama",
      desc: "Story of young men navigating adulthood and friendship.",
      banner:
        "https://cdn.district.in/movies-assets/images/cinema/Vaazha%202-43d71120-2c2b-11f1-a7d0-35090adde4d8.jpg",
      poster:
        "https://cdn.district.in/movies-assets/images/cinema/Vaazha%202-43d71120-2c2b-11f1-a7d0-35090adde4d8.jpg",
    },
    {
      title: "Mr. X",
      genre: "UA13+ | Action, Thriller",
      desc: "A rogue agent uncovers a global conspiracy.",
      banner:
        "https://cdn.district.in/movies-assets/images/cinema/Mrx--049f0200-3735-11f1-9d7b-1f3ab138d345.jpg",
      poster:
        "https://cdn.district.in/movies-assets/images/cinema/Mrx--049f0200-3735-11f1-9d7b-1f3ab138d345.jpg",
    },
  ];

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
    <div className="relative overflow-hidden">
      {/* LEFT ARROW */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 text-white text-xl flex items-center justify-center"
      >
        ‹
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 text-white text-xl flex items-center justify-center"
      >
        ›
      </button>

      {/* SLIDER */}
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
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {movies.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
              i === realIndex ? "w-5 bg-black" : "w-2 bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerContainer;