import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useCallback, useMemo, useState } from "react";
import { SHORT_FILM_DURATION } from "../../utils/сonstants";

const SavedMovies = ({
  isLoading: isLoadingSaved,
  savedMovieList,
  savedMovies: savedMoviesList,
  deleteMovieToList,
}) => {
  // Состояние для управления чекбоксом "Короткометражки"
  const [isChecked, setIsChecked] = useState(true);

  // Состояние для хранения значения поискового запроса
  const [moviesSearch, setMoviesSearch] = useState("");

  // Состояние для хранения отфильтрованных фильмов
  const [filterString, setFilterString] = useState("");

  // Обработчик для установки значения поискового запроса в состояние filterString
  const handleSearchMovies = useCallback(() => {
    setFilterString(moviesSearch);
  }, [moviesSearch]);

  // Мемоизированный список отфильтрованных фильмов
  const filtredMovies = useMemo(() => {
    return savedMoviesList.filter((movie) => {
      const filtredMovieInclude =
        movie.nameRU.toLowerCase().includes(filterString.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(filterString.toLowerCase());
      return isChecked
        ? filtredMovieInclude
        : movie.duration < SHORT_FILM_DURATION && filtredMovieInclude;
    });
  }, [filterString, isChecked, savedMoviesList]);

  return (
    <>
      {/* Компонент поисковой формы */}
      <SearchForm
        moviesSearch={moviesSearch}
        setMoviesSearch={setMoviesSearch}
        handleSearchMovies={handleSearchMovies}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />

      {/* Компонент списка фильмов */}
      <MoviesCardList
        isLoading={isLoadingSaved}
        filtredMovies={filtredMovies}
        savedMovieList={savedMovieList}
        savedMovies={savedMoviesList}
        deleteMovieToList={deleteMovieToList}
        handleSearchMovies={handleSearchMovies}
      />
      <div className="save-movie_box"></div>
    </>
  );
};

export default SavedMovies;
