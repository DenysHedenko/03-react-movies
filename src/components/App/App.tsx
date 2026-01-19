// import { useState } from 'react';
// import './App.css';
// import 'react-hot-toast';
// import MovieModal from '../MovieModal/MovieModal';
// import SearchBar from '../SearchBar/SearchBar';
// import toast, { Toaster } from 'react-hot-toast';
// import axios from 'axios';
// import { Movie } from '../../types/movie';
// import { searchMovies } from '../../api/request';

import { useState } from "react";
import MovieGrid from "../MovierGrid/MovieGrid";
import SearchBar from "../SearchBar/SearchBar";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import fetchMovies from "../../services/movieService";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

// export default function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const [movies, setMovies] = useState<Movie[]>([]);

//   const handleSearch = async (query: string) => {
//     try {
//       const data = await searchMovies(query);
//       setMovies(data.results);

//     } catch {
//       toast.error("Something went wrong. Try again later.")
//     }
//     }

//   return (
//     <>
//       <Toaster position="top-center" reverseOrder={false} />
//       <SearchBar onSubmit={handleSearch} />
//       {isModalOpen && <MovieModal onClose={closeModal} />}
//     </>
//   )
// }

// onSubmit, movies, onSelect, movie, onClose

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState<Movie>(null);

  // Вибір карти з фільмом
  const handleSelect (movie: Movie) => {
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
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage/>}
      {movies.length > 0 && <MovieGrid onSelect={movie}/>}

      <MovieModal onClose={ } movie={ } />
    </>
  );
}
