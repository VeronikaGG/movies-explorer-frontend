import "./App.css";
import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import InfoPopup from "../infoPopup/infoPopup";
import PageNotFound from "../PageNotFound/PageNotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import * as mainApi from "../../utils/MainApi";
import * as moviesApi from "../../utils/MoviesApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") || false;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [profileMessage, setProfileMessage] = useState(false);
  const [infoPopup, setInfoPopup] = useState({
    status: true,
    messageText: "",
    isOpened: false,
  });
  const [isResOk, setIsResOk] = useState(false);

  // Выход пользователя из аккаунта
  function handleSignOut() {
    localStorage.clear();
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.setItem("loggedIn", false);
    navigate("/", { replace: true });
  }
  // Проверяем, есть ли jwt токен в localStorage  при запуске приложения
  useEffect(() => {
    setIsLoading(true);
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .tokenCheck(jwt)
        .then((data) => {
          setCurrentUser(data);
          setLoggedIn(true);
          localStorage.setItem("loggedIn", loggedIn);
          navigate(location.pathname, { replace: true });
        })
        .catch((err) => {
          console.log(err);
          handleSignOut();
        })
        .finally(() => setIsLoading(false));
    } else {
      handleSignOut();
    }
  }, [loggedIn]);

  // Функция для загрузки сохраненных фильмов из сервера
  function fetchSavedMovies() {
    setIsLoading(true);
    mainApi
      .getSavedMovies()
      .then((data) => {
        setSavedMovies(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  // Функция для загрузки всех фильмов из сервера
  function fetchAllMovies() {
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((data) => {
        setAllMovies(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Загружаем список всех фильмов и сохраненных фильмов после авторизации пользователя
  useEffect(() => {
    if (loggedIn) {
      fetchAllMovies();
      fetchSavedMovies();
    }
  }, [loggedIn]);

  // Сохраняем фильм в список сохраненных фильмов
  function saveMovieToSavedList(movie) {
    mainApi
      .addMovieToSaved(movie)
      .then((userMovie) => {
        setSavedMovies([...savedMovies, userMovie]);
      })
      .catch((err) => {
        console.log(err);
        setInfoPopup({
          status: false,
          messageText: "На сервере произошла ошибка.",
          isOpened: true,
        });
      });
  }

  // Удаляем фильм из списка сохраненных фильмов
  function deleteMovieFromSavedList(movie) {
    const movieToDelete = savedMovies.find(
      (m) => movie.id === m.movieId || movie.movieId === m.movieId
    );
    mainApi
      .deleteMovieFromSaved(movieToDelete._id)
      .then((removedMovie) => {
        setSavedMovies((state) =>
          state.filter((item) => item._id !== removedMovie._id)
        );
      })
      .catch((err) => {
        console.log(err);
        setInfoPopup({
          status: false,
          messageText: "На сервере произошла ошибка.",
          isOpened: true,
        });
      });
  }

  // Регистрация нового пользователя
  function handleRegistration(data) {
    setIsLoading(true);
    mainApi
      .registerUser(data)
      .then((res) => {
        if (res) {
          handleLogin(data); // Регистрация успешна, автоматически входим
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === 409) {
          setInfoPopup({
            status: false,
            messageText: " Пользователь с таким email уже существует.",
            isOpened: true,
          });
        } else {
          setInfoPopup({
            status: false,
            messageText: " При регистрации пользователя произошла ошибка",
            isOpened: true,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Вход пользователя
  function handleLogin(data) {
    setIsLoading(true);
    mainApi
      .loginUser(data)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", data.token); // Сохраняем токен
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === 401) {
          setInfoPopup({
            status: false,
            messageText: " Вы ввели неправильный логин или пароль.",
            isOpened: true,
          });
        } else {
          setInfoPopup({
            status: false,
            messageText:
              " При авторизации произошла ошибка. Переданный токен некорректен",
            isOpened: true,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Обновление информации о пользователе
  function updateUserProfile(userData) {
    setIsLoading(true);
    mainApi
      .updateUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        setProfileMessage(true);
        setIsResOk(true);
      })
      .catch((err) => {
        console.log(err);
        if (err === 409) {
          setInfoPopup({
            status: false,
            messageText: " Пользователь с таким email уже существует.",
            isOpened: true,
          });
        } else {
          setInfoPopup({
            status: false,
            messageText: " При обновлении профиля произошла ошибка.",
            isOpened: true,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Закрытие попапа с уведомлением об ошибках
  function closeInfoPopup() {
    setInfoPopup({ status: true, messageText: "", isOpened: false });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {infoPopup.isOpened ? (
        <InfoPopup
          status={infoPopup.status}
          messageText={infoPopup.messageText}
          close={closeInfoPopup}
          isOpened={infoPopup.isOpened}
        />
      ) : null}
      <div className="app">
        <Header loggedIn={loggedIn} />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  element={Movies}
                  loggedIn={loggedIn}
                  isLoading={isLoading}
                  allMovies={allMovies}
                  saveMovieToSavedList={saveMovieToSavedList}
                  savedMovies={savedMovies}
                  deleteMovieFromSavedList={deleteMovieFromSavedList}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  loggedIn={loggedIn}
                  isLoading={isLoading}
                  saveMovieToSavedList={saveMovieToSavedList}
                  savedMovies={savedMovies}
                  deleteMovieFromSavedList={deleteMovieFromSavedList}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={Profile}
                  profileMessage={profileMessage}
                  setProfileMessage={setProfileMessage}
                  isResOk={isResOk}
                  loggedIn={loggedIn}
                  updateUserProfile={updateUserProfile}
                  isLoading={isLoading}
                  handleSignOut={handleSignOut}
                />
              }
            />
            <Route
              path="/signup"
              element={
                loggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Register
                    loggedIn={loggedIn}
                    handleRegistration={handleRegistration}
                    isLoading={isLoading}
                  />
                )
              }
            />
            <Route
              path="/signin"
              element={
                loggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Login
                    loggedIn={loggedIn}
                    handleLogin={handleLogin}
                    isLoading={isLoading}
                  />
                )
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
