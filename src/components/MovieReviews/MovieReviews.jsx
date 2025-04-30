import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTA2NThkMWE2ODcyMjcyYTFlZDFhYjlhZjU0MzE3NCIsIm5iZiI6MTc0MjA2NjI1My4xNjksInN1YiI6IjY3ZDVkMjRkMjVmMDFkNTQxNjdiYmQ3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cxkPlTGh7dUhNvEvm8rJ4KcpWO9kaUUabbcL2QFMVzg",
            },
          }
        );
        setReviews(response.data.results);
      } catch (err) {
        setError(
          "An error occurred while loading the reviews. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) return <p className={css.loading}>Loading...</p>;
  if (error) return <p className={css.error}>{error}</p>;
  if (!reviews || reviews.length === 0) return <p>There is no reviews yet.</p>;

  return (
    <ul className={css.list}>
      {reviews.map((review) => (
        <li key={review.id} className={css.reviewItem}>
          <p className={css.author}>{review.author}</p>
          <p className={css.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;
