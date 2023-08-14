import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { SHORT_FILM_DURATION } from "../../utils/сonstants";

const Movies = ({
  isLoading,
  savedMovieList,
  deleteMovieToList,
  savedMovies,
  allMovies,
}) => {
  // Состояние для управления чекбоксом "Короткометражки"
  const [isChecked, setIsChecked] = useState(
    localStorage.getItem("isShort") === "true"
  );

  // Состояние для хранения значения поискового запроса
  const [moviesSearch, setMoviesSearch] = useState(
    localStorage.getItem("moviesSearch") || ""
  );

  // Состояние для хранения отфильтрованных фильмов
  const [filteredMovies, setFilteredMovies] = useState(
    localStorage.getItem("filteredMovies")
      ? JSON.parse(localStorage.getItem("filteredMovies"))
      : []
  );

  // Обработчик для фильтрации фильмов и сохранения результатов в состояние filteredMovies и в localStorage
  function handleSearchMoviesButton(isChecked) {
    const movies = allMovies.filter((movie) => {
      const filteredMovieInclude =
        movie.nameRU.toLowerCase().includes(moviesSearch.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(moviesSearch.toLowerCase());

      return isChecked
        ? filteredMovieInclude
        : movie.duration < SHORT_FILM_DURATION && filteredMovieInclude;
    });

    setFilteredMovies(movies);
    localStorage.setItem("isShort", isChecked.toString());
    localStorage.setItem("filteredMovies", JSON.stringify(movies));
    localStorage.setItem("moviesSearch", moviesSearch);
  }

  // Эффект для обновления значения чекбокса в localStorage при его изменении
  useEffect(() => {
    localStorage.setItem("isShort", isChecked.toString());
  }, [isChecked]);

  return (
    <>
      {/* Компонент поисковой формы */}
      <SearchForm
        moviesSearch={moviesSearch}
        setMoviesSearch={setMoviesSearch}
        handleSearchMovies={handleSearchMoviesButton}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />

      {/* Компонент списка фильмов */}
      <MoviesCardList
        isLoading={isLoading}
        savedMovieList={savedMovieList}
        savedMovies={savedMovies}
        deleteMovieToList={deleteMovieToList}
        movies={filteredMovies}
        filtredMovies={filteredMovies}
      />
    </>
  );
};

export default Movies;
