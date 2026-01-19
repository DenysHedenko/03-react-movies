import axios from 'axios';
import type { Movie } from '../types/movie';

export interface MoviesHttpResponse {
    results: Movie[];
}

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    }
})

export default async function fetchMovies(query: string): Promise<Movie[]> {
    const response = await api.get<MoviesHttpResponse>("search/movie", {
        params: {
            query
        },
    });
    const movies = response.data.results;
    return movies;
}