import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTA2NThkMWE2ODcyMjcyYTFlZDFhYjlhZjU0MzE3NCIsIm5iZiI6MTc0MjA2NjI1My4xNjksInN1YiI6IjY3ZDVkMjRkMjVmMDFkNTQxNjdiYmQ3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cxkPlTGh7dUhNvEvm8rJ4KcpWO9kaUUabbcL2QFMVzg",
            },
          }
        );
        setMovies(response.data.results);
      } catch (err) {
        setError(
          "An error occurred while loading the movies. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1>Trending Movies</h1>
      {loading && <p className={css.loading}>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default HomePage;
