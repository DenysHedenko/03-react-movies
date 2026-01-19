import { useState } from "react";
import MovieGrid from "../MovierGrid/MovieGrid";
import SearchBar from "../SearchBar/SearchBar";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import fetchMovies from "../../services/movieService";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";


export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Вибір картки з фільмом
  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  }

  // Запит на сервер
  const handleSearch = async (topic: string) => {
    setIsError(false);
    setMovies([]);
    setIsLoading(true);
    try {
      const movies = await fetchMovies(topic);
      setMovies(movies);

      if (movies.length === 0) {
        toast.error("No movies found for your request.");
      };
    }
    catch {
      setIsError(true);
    }
    finally {
      setIsLoading(false);
    };
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid onSelect={handleSelect} movies={movies} />}

      {selectedMovie &&
        (<MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />)}
    </>
  );
}
