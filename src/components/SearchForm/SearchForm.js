import React, { useState } from "react";

import "./SearchForm.css";
import imageFind from "../../images/find.svg";
import imageLope from "../../images/lope.svg";

const SearchForm = ({
  moviesSearch,
  setMoviesSearch,
  isChecked,
  setIsChecked,
  handleSearchMovies,
}) => {
  const [inputError, setInputError] = useState(false);
  // Обработчик изменения текста в поле ввода
  const handleChange = (e) => {
    setMoviesSearch(e.target.value);
  };

  // Обработчик нажатия кнопки "Поиск"
  // const handleSubmit = (e) => {
  //   if (!moviesSearch) return;
  //   e.preventDefault();
  //   handleSearchMovies(isChecked);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!moviesSearch) {
      setInputError(true); // Если поле ввода пустое, добавляем валидацию
      return;
    }

    handleSearchMovies(isChecked); // Вызываем переданную функцию для выполнения поиска
  };

  // Обработчик переключения чекбокса "Короткометражки"
  const handleCheckbox = () => {
    handleSearchMovies(!isChecked); // Вызываем переданную функцию для выполнения фильтрации
    setIsChecked(!isChecked); // Обновляем состояние чекбокса
  };

  return (
    <>
      <div className="searchform">
        <form className="searchform__form" onSubmit={handleSubmit}>
          <img src={imageLope} alt="Изображение лупы" />
          <input
            className={`searchform__input ${
              inputError ? "searchform__input_error" : ""
            }`}
            type="text"
            placeholder="Фильм"
            required
            onChange={handleChange}
            value={moviesSearch}
          />
          {inputError && (
            <span className="searchform__input-error">
              Нужно ввести ключевое слово
            </span>
          )}

          <button type="submit" className="searchform__search">
            <img src={imageFind} alt="Кнопка поиска" />
          </button>
        </form>
        <div className="searchform__line"></div>
        <div className="filter">
          {/* Чекбокс "Короткометражки" */}
          <label htmlFor="checkbox" className="filter__label">
            <input
              type="checkbox"
              id="checkbox"
              className="filter__checkbox-hidden"
              checked={!isChecked} // Переключаем чекбокс в зависимости от состояния
              onChange={handleCheckbox}
            />
            <span className="filter__checkbox-visible"></span>
            <span className="filter__text">Короткометражки</span>
          </label>
        </div>
      </div>
    </>
  );
};

export default SearchForm;
