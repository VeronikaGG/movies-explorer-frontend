import React, { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { SHORT_FILM_DURATION } from "../../utils/сonstants";

const Movies = ({
  isLoading,
  saveMovieToSavedList,
  deleteMovieFromSavedList,
  savedMovies,
  allMovies,
}) => {
  // Состояние для управления чекбоксом "Короткометражки"
  const [isChecked, setIsChecked] = useState(
    localStorage.getItem("isShortChecked") === "true" || true
  );
  const [inputError, setInputError] = useState(false); // Состояние для отображения ошибки ввода
  // Состояние для хранения значения поискового запроса
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("searchQuery") || ""
  );
  // Состояние для хранения отфильтрованных фильмов
  const [filteredMoviesData, setFilteredMoviesData] = useState(
    localStorage.getItem("filteredMoviesData")
      ? JSON.parse(localStorage.getItem("filteredMoviesData"))
      : []
  );

  // Обработчик для фильтрации фильмов и сохранения результатов в состояние filteredMoviesData и в localStorage
  function handleSearchMoviesButton(isChecked) {
    if (!searchQuery) {
      setInputError(true); // Если поле ввода пустое, добавляем валидацию
      return;
    } else {
      setInputError(false);
      const movies = allMovies.filter((movie) => {
        const filteredMovieInclude =
          movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase());
        return isChecked
          ? filteredMovieInclude
          : movie.duration < SHORT_FILM_DURATION && filteredMovieInclude;
      });
      setFilteredMoviesData(movies);
      localStorage.setItem("isShortChecked", isChecked.toString());
      localStorage.setItem("filteredMoviesData", JSON.stringify(movies));
      localStorage.setItem("searchQuery", searchQuery);
    }
  }

  // Эффект для обновления значения чекбокса в localStorage при его изменении
  useEffect(() => {
    localStorage.setItem("isShortChecked", isChecked.toString());
  }, [isChecked]);

  return (
    <>
      {/* Компонент поисковой формы */}
      <SearchForm
        inputError={inputError}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchMoviesButton={handleSearchMoviesButton}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
      {inputError && (
        <span className="searchform__input-error">
          Нужно ввести ключевое слово
        </span>
      )}
      {/* Компонент списка фильмов */}
      {!inputError && (
        <MoviesCardList
          isLoading={isLoading}
          saveMovieToSavedList={saveMovieToSavedList}
          savedMovies={savedMovies}
          deleteMovieFromSavedList={deleteMovieFromSavedList}
          movies={filteredMoviesData}
          filtredMovies={filteredMoviesData}
        />
      )}
    </>
  );
};

export default Movies;
