import { useMemo } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../utils/сonstants";

const MoviesCard = ({
  movie,
  savedMovies,
  saveMovieToSavedList,
  deleteMovieFromSavedList,
}) => {
  // Получаем текущий путь из URL для определения режима отображения кнопок
  const { pathname } = useLocation();

  // Функция для конвертации длительности фильма в удобный формат
  const formatMovieDuration = (length) => {
    if (length >= 60) {
      return `${Math.floor(length / 60)}ч ${length % 60}м`;
    }
    return `${length}м`;
  };

  // Проверяем, есть ли фильм в списке сохраненных фильмов, используя useMemo
  const isLiked = useMemo(() => {
    return savedMovies.some((m) => m.movieId === movie.id);
  }, [movie, savedMovies]);

  // Обработчик нажатия кнопки "Лайк" или "Удалить"
  function toggleMovieLike() {
    // Если фильм не сохранен, добавляем его в список сохраненных, иначе удаляем из списка
    !isLiked ? saveMovieToSavedList(movie) : deleteMovieFromSavedList(movie);
  }

  // Определяем класс кнопки в зависимости от того, сохранен ли фильм
  const cardLikeButtonClassName = `movie__button ${
    isLiked ? "movie__button_like" : "movie__button_dislike"
  }`;

  // Обработчик нажатия кнопки "Удалить" в разделе "Сохраненные фильмы"
  function handleRemoveSavedMovie() {
    return deleteMovieFromSavedList(movie);
  }

  return (
    <li className="movie">
      <div className="movie_container">
        <div>
          <h2 className="movie__title">{movie.nameRU || movie.nameEN}</h2>
          <p className="movie__duration">
            {formatMovieDuration(movie.duration)}
          </p>
        </div>
        {/* Отображаем кнопку "Лайк" или "Удалить" в зависимости от режима */}
        {pathname === "/movies" ? (
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={toggleMovieLike}
          />
        ) : (
          <button
            className="movie__button movie__button_delete"
            type="button"
            onClick={handleRemoveSavedMovie}
          />
        )}
      </div>
      <a href={movie.trailerLink} target="_blank" rel="noreferrer noopener">
        <img
          className="movie__image"
          alt={movie.nameRU || movie.nameEN}
          src={movie.image.url ? `${API_URL}${movie.image.url}` : movie.image}
        />
      </a>
    </li>
  );
};

export default MoviesCard;
