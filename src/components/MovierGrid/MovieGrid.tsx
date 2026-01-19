import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css"


interface MovieGridProps {
    onSelect: (movie:Movie) => void;
    movies: Movie[];
}
export default function MovieGrid({ movies, onSelect }:MovieGridProps) {
    movies.map<Movie>(()=> {
        
    })

    // const handleSelect = (e: React.MouseEvent) {
    //     if (e.target === e.currentTarget) {
    //         onSelect(movie);
    //     }
    // }



    return (
        <ul className={css.grid}>
            {/* Набір елементів списку з фільмами */}
            <li>
                <div
                    className={css.card}
                    onClick={() => onSelect(movie)}
                >
                    <img
                        className={css.image}
                        src="https://image.tmdb.org/t/p/w500/poster-path"
                        alt="movie title"
                        loading="lazy"
                    />
                    <h2 className={css.title}>Movie title</h2>
                </div>
            </li>
        </ul>

    )
}