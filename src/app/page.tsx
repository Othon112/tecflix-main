"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/types/Movie";
import MovieCard from "@/components/MovieCard";
import MoviesApi from "@/api/MoviesApi";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>();
  async function loadMovies() {
    const apiMovies = await MoviesApi.findAll();
    setMovies(apiMovies);
  }
  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div className="p-10">
      <div className="w-full inline-flex space-x-2 flex-row">
        {movies?.map((element: Movie) => {
          return <MovieCard key={element.title} movie={element} />;
        })}
      </div>
    </div>
  );
}
