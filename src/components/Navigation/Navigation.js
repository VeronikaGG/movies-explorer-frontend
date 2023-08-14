import React, { useState } from "react";
import "./Navigation.css";
import { NavLink, Link, useLocation } from "react-router-dom";
import icon from "../../images/icon__main.svg";

const Navigation = ({ loggedIn }) => {
  // Состояние для отображения/скрытия бургер-меню
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  // Получаем текущий путь страницы
  const { pathname } = useLocation();

  // Обработчик изменения размера окна
  window.onresize = () => {
    setIsBurgerActive(false); // Закрываем бургер-меню при изменении размера окна
  };

  return (
    <>
      {/* Неавторизованный пользователь */}
      {!loggedIn ? (
        <div>
          <Link to="/signup" className="navigation__signup links">
            Регистрация
          </Link>
          <Link to="/signin" className="navigation__signin links">
            Войти
          </Link>
        </div>
      ) : (
        // Авторизованный пользователь
        <>
          {/* Навигационное меню */}
          <nav
            className={`navigation ${
              isBurgerActive ? "navigation_active" : ""
            }`}
          >
            <div
              className={`navigation__container ${
                isBurgerActive ? "navigation__container_active" : ""
              }`}
            >
              {/* Ссылки на разделы сайта */}
              <NavLink to="/" className="navigation__main links line">
                Главная
              </NavLink>
              <div className="navigation__movies-wrapper">
                <NavLink
                  to="/movies"
                  className={`navigation__movies line links ${
                    pathname === "/" ? "navigation__movies_white" : ""
                  }`}
                >
                  Фильмы
                </NavLink>
                <NavLink
                  to="/saved-movies"
                  className={`navigation__saved-movies line links ${
                    pathname === "/" ? "navigation__saved-movies_white" : ""
                  }`}
                >
                  Сохранённые фильмы
                </NavLink>
              </div>
              <NavLink
                to="/profile"
                className={`navigation__account links navigation__account_${
                  pathname === "/" ? "green" : "white"
                }`}
              >
                Аккаунт
                <div className="header__icon-box">
                  <img
                    src={icon}
                    alt="Иконка профиля"
                    className="header__icon"
                  />
                </div>
              </NavLink>
            </div>
          </nav>
          {/* Кнопка бургер-меню */}
          <button
            className="burger"
            type="button"
            onClick={() => setIsBurgerActive(!isBurgerActive)}
          >
            {/* Линии бургер-меню */}
            <span
              className={`burger ${isBurgerActive ? "burger-close" : ""}`}
            />
          </button>
        </>
      )}
    </>
  );
};

export default Navigation;
