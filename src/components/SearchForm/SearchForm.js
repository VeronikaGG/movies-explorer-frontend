import React from "react";
import "./SearchForm.css";
import imageFind from "../../images/find.svg";
import imageLope from "../../images/lope.svg";

const SearchForm = ({
  searchQuery,
  setSearchQuery,
  isChecked,
  setIsChecked,
  handleSearchMoviesButton,
  inputError,
}) => {
  // Обработчик изменения текста в поле ввода
  const updateSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  // Обработчик нажатия кнопки "Поиск"
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearchMoviesButton(isChecked); // Вызываем переданную функцию для выполнения поиска
  };

  // Обработчик переключения чекбокса "Короткометражки"
  const toggleCheckbox = () => {
    handleSearchMoviesButton(!isChecked); // Вызываем переданную функцию для выполнения фильтрации
    setIsChecked(!isChecked); // Обновляем состояние чекбокса
  };

  return (
    <>
      <div className="searchform">
        <form className="searchform__form" onSubmit={handleSearchSubmit}>
          <img
            className="searchform__form-icon"
            src={imageLope}
            alt="Изображение лупы"
          />
          <input
            className={`searchform__input ${
              inputError ? "searchform__input_error" : ""
            }`}
            type="text"
            placeholder="Фильм"
            onChange={updateSearchQuery}
            value={searchQuery}
          />

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
              onChange={toggleCheckbox}
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
