import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import * as mainApi from "../../utils/MainApi";
import * as moviesApi from "../../utils/MoviesApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  // Выход пользователя из аккаунта
  function handleSignOut() {
    localStorage.clear();
    setCurrentUser({});
    setLoggedIn(false);
    navigate("/", { replace: true });
  }
  // Проверяем, есть ли jwt токен в localStorage и авторизуем пользователя при запуске приложения
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .getCurrentUserInfo()
        .then((data) => {
          setCurrentUser((userData) => ({
            ...userData,
            name: data.name,
            email: data.email,
            _id: data._id,
          }));
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          handleSignOut();
        });
    } else {
      handleSignOut();
    }
  }, [loggedIn]);

  // Загружаем список всех фильмов и сохраненных фильмов после авторизации пользователя
  useEffect(() => {
    function loadAllMovies() {
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

    function loadSavedMovies() {
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
    if (loggedIn) {
      loadAllMovies();
      loadSavedMovies();
    }
  }, [loggedIn]);

  // Сохраняем фильм в список сохраненных фильмов
  function savedMovieList(movie) {
    mainApi
      .addMovieToSaved(movie)
      .then((userMovie) => {
        setSavedMovies([userMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Удаляем фильм из списка сохраненных фильмов
  function deleteMovieToList(movie) {
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
      });
  }

  // Регистрация нового пользователя
  function handleSignUp(data) {
    setIsLoading(true);
    mainApi
      .registerUser(data)
      .then((res) => {
        if (res) {
          handleSignIn(data); // Регистрация успешна, автоматически входим
        }
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Вход пользователя
  function handleSignIn(data) {
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
        setLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Обновление информации о пользователе
  function handleUserUpdate(userData) {
    setIsLoading(true);
    mainApi
      .updateUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
                  savedMovieList={savedMovieList}
                  savedMovies={savedMovies}
                  deleteMovieToList={deleteMovieToList}
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
                  savedMovieList={savedMovieList}
                  savedMovies={savedMovies}
                  deleteMovieToList={deleteMovieToList}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={Profile}
                  loggedIn={loggedIn}
                  signOut={handleSignOut}
                  handleUserUpdate={handleUserUpdate}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  loggedIn={loggedIn}
                  handleSignUp={handleSignUp}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  loggedIn={loggedIn}
                  handleSignIn={handleSignIn}
                  isLoading={isLoading}
                />
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
