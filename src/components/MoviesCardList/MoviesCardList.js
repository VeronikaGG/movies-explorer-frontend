import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import {
  SCREEN_WIDTH_1190,
  SCREEN_WIDTH_750,
  LARGE_MOVIES_AMOUNT,
  MEDIUM_MOVIES_AMOUNT,
  SMALL_MOVIES_AMOUNT,
  ADDITIONAL_LARGE_MOVIES_AMOUNT,
  ADDITIONAL_SMALL_MOVIES_AMOUNT,
} from "../../utils/сonstants";

const MoviesCardList = ({
  movies,
  savedMovies,
  saveMovieToSavedList,
  deleteMovieFromSavedList,
  filtredMovies,
  isLoading,
}) => {
  // Получаем текущий путь из URL для определения списка фильмов
  const { pathname } = useLocation();
  const currentMoviesList = pathname === "/movies" ? movies : filtredMovies;

  // Состояние для определения количества отображаемых фильмов на странице
  const [moviesPerPage, setMoviesPerPage] = useState(() => {
    if (window.innerWidth >= SCREEN_WIDTH_1190) return LARGE_MOVIES_AMOUNT;
    else if (
      window.innerWidth < SCREEN_WIDTH_1190 &&
      window.innerWidth >= SCREEN_WIDTH_750
    )
      return MEDIUM_MOVIES_AMOUNT;
    else if (window.innerWidth < SCREEN_WIDTH_750) return SMALL_MOVIES_AMOUNT;
  });

  // Состояние для определения, показывать ли кнопку "Еще"
  const [showPagination, setShowPagination] = useState(false);

  // Обновляем количество отображаемых фильмов на странице при изменении списка фильмов
  useEffect(() => {
    updateMoviesPerPage();
    window.addEventListener("resize", updateMoviesPerPage);
    return () => {
      window.removeEventListener("resize", updateMoviesPerPage);
    };
  }, []);

  // Обновляем состояние показа кнопки "Еще" при изменении количества отображаемых фильмов на странице
  useEffect(() => {
    if (currentMoviesList.length === 0) {
      setShowPagination(false);
    }
    if (moviesPerPage >= currentMoviesList.length) setShowPagination(false);
    else setShowPagination(true);
  }, [currentMoviesList, moviesPerPage]);

  // Функция для обновления количества отображаемых фильмов на странице в зависимости от ширины окна
  function updateMoviesPerPage() {
    if (window.innerWidth >= SCREEN_WIDTH_1190)
      return setMoviesPerPage(LARGE_MOVIES_AMOUNT);
    else if (
      window.innerWidth < SCREEN_WIDTH_1190 &&
      window.innerWidth >= SCREEN_WIDTH_750
    )
      return setMoviesPerPage(MEDIUM_MOVIES_AMOUNT);
    else if (window.innerWidth < SCREEN_WIDTH_750)
      return setMoviesPerPage(SMALL_MOVIES_AMOUNT);
  }

  // Функция для обработки клика по кнопке "Еще" и отображения дополнительных фильмов
  function increaseMoviesPerPage() {
    if (window.innerWidth >= SCREEN_WIDTH_1190)
      return setMoviesPerPage(moviesPerPage + ADDITIONAL_LARGE_MOVIES_AMOUNT);
    else if (window.innerWidth < SCREEN_WIDTH_1190)
      return setMoviesPerPage(moviesPerPage + ADDITIONAL_SMALL_MOVIES_AMOUNT);
  }

  return (
    <section className="cards">
      {/* Показываем прелоадер, если идет загрузка */}
      {isLoading && <Preloader />}

      {/* Проверяем, есть ли фильмы для отображения */}
      {currentMoviesList.length === 0 ? (
        <p className="not-found">Ничего не найдено</p>
      ) : (
        <ul className="cards__list">
          {/* Отображаем список фильмов */}
          {currentMoviesList.slice(0, moviesPerPage).map((movie) => (
            <MoviesCard
              movie={movie}
              savedMovies={savedMovies}
              filtredMovies={filtredMovies}
              saveMovieToSavedList={saveMovieToSavedList}
              deleteMovieFromSavedList={deleteMovieFromSavedList}
              key={movie.id || movie.movieId}
            />
          ))}
        </ul>
      )}

      {/* Показываем кнопку "Еще", если есть дополнительные фильмы для отображения */}
      {showPagination && (
        <button
          className="cards__button"
          type="button"
          onClick={increaseMoviesPerPage}
        >
          Еще
        </button>
      )}
    </section>
  );
};

export default MoviesCardList;
