import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}`,
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
          "An error occurred while loading movies. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const value = form.elements.query.value.trim();
    if (value) {
      setSearchParams({ query: value });
    }
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="query"
          placeholder="Search movies..."
          defaultValue={query}
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>

      {loading && <p className={css.loading}>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}
      {!loading && !error && movies.length > 0 && <MovieList movies={movies} />}
      {!loading && !error && query && movies.length === 0 && (
        <p>No movies found matching your search.</p>
      )}
    </div>
  );
}

export default MoviesPage;
