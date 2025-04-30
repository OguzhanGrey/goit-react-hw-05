import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MovieCast.module.css";

function MovieCast() {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTA2NThkMWE2ODcyMjcyYTFlZDFhYjlhZjU0MzE3NCIsIm5iZiI6MTc0MjA2NjI1My4xNjksInN1YiI6IjY3ZDVkMjRkMjVmMDFkNTQxNjdiYmQ3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cxkPlTGh7dUhNvEvm8rJ4KcpWO9kaUUabbcL2QFMVzg",
            },
          }
        );
        setCast(response.data.cast);
      } catch (err) {
        setError("An error occurred while loading the player list.");
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <p className={css.loading}>Loading...</p>;

  if (error) return <p className={css.error}>{error}</p>;

  if (!cast || cast.length === 0)
    return <p>Player information could not be found.</p>;

  return (
    <ul className={css.list}>
      {cast.map((actor) => (
        <li key={actor.id} className={css.item}>
          {actor.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              className={css.img}
            />
          ) : (
            <div className={css.noImage}>No Pictures</div>
          )}
          <p className={css.name}>{actor.name}</p>
          {actor.character && (
            <p className={css.character}>Character: {actor.character}</p>
          )}
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
