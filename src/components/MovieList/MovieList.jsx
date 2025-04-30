import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

function MovieList({ movies }) {
  const location = useLocation();

  if (!movies || movies.length === 0) {
    return <p>No film has been found.</p>;
  }

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.item}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={css.link}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
