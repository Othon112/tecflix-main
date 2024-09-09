import networkService from "./Config";
import { Movie } from "@/types/Movie";

interface MoveFromApi {
  results: [
    {
      title: string;
      backdrop_path: string;
      vote_average: number;
      genre_ids: [number];
      overview: string;
    }
  ];
}

class MoviesApi {
  public async findAll(): Promise<Movie[]> {
    try {
      console.log("Movie.findAll()");
      const movies = await networkService.get<MoveFromApi>(
        "/3/trending/movie/day?language=en-US"
      );
      const result = [] as Movie[];
      movies.results.map((movie) => {
        result.push({
          cover: "https://image.tmdb.org/t/p/w500/" + movie.backdrop_path,
          title: movie.title,
          votes: movie.vote_average,
        });
      });
      return result;
    } catch (error) {
      throw new Error(`Error al obtener las peliculas`);
    }
  }
}

export default new MoviesApi();
