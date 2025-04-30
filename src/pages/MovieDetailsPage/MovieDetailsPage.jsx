import { useState, useEffect, useRef } from "react";
import {
  useParams,
  NavLink,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import css from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const backLink = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTA2NThkMWE2ODcyMjcyYTFlZDFhYjlhZjU0MzE3NCIsIm5iZiI6MTc0MjA2NjI1My4xNjksInN1YiI6IjY3ZDVkMjRkMjVmMDFkNTQxNjdiYmQ3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cxkPlTGh7dUhNvEvm8rJ4KcpWO9kaUUabbcL2QFMVzg",
            },
          }
        );
        setMovie(response.data);
      } catch (err) {
        setError(
          "An error occurred while uploading movie details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <p className={css.loading}>Loading...</p>;
  if (error) return <p className={css.error}>{error}</p>;
  if (!movie) return null;

  return (
    <div className={css.container}>
      <Link to={backLink.current} className={css.backLink}>
        ← Go Back
      </Link>

      <div className={css.movieInfo}>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p>
          <strong>Average of Votes:</strong> {movie.vote_average}
        </p>
      </div>

      <nav className={css.navLinks}>
        <NavLink
          to={`/movies/${movieId}/cast`}
          className={({ isActive }) => (isActive ? css.active : "")}
        >
          Actors
        </NavLink>
        <NavLink
          to={`/movies/${movieId}/reviews`}
          className={({ isActive }) => (isActive ? css.active : "")}
        >
          Reviews
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
