import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";

import auth from "../../utils/auth";

import {
  SHORT_FILM_DURATION,
  SCREEN_WIDTH_480,
  SCREEN_WIDTH_768,
  LARGE_MOVIES_AMOUNT,
  MEDIUM_MOVIES_AMOUNT,
  SMALL_MOVIES_AMOUNT,
  ADDITIONAL_LARGE_MOVIES_AMOUNT,
  ADDITIONAL_SMALL_MOVIES_AMOUNT,
} from "../../utils/сonstants";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [filterMovies, setFilterMovies] = useState([]);
  const [moviesForRender, setMoviesForRender] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreloaderLoading, setIsPreloaderLoading] = useState(false);
  const [isFilterChecked, setIsFilterChecked] = useState(false);
  const [isFilterCheckedInSaved, setIsFilterCheckedInSaved] = useState(false);
  const [isInputInSaved, setIsInputInSaved] = useState("");
  const [savedMovies, setSavedMovies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageProfile, setErrorMessageProfile] = useState("");
  const [nothingFoundInSaved, setNothingFoundInSaved] = useState("");
  const [isFuther, setIsFuther] = useState(false);
  const [firstMoviesAmount, setFirstMoviesAmount] = useState(0);
  const [addMoviesAmount, setAddMoviesAmount] = useState(0);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const location = useLocation();

  const navigate = useNavigate();

 

  useEffect(() => {
    setIsPreloaderLoading(true);
    handleTokenCheck();
    setIsPreloaderLoading(false);
  }, [location.pathname]);

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .checkToken()
        .then((res) => {
          setLoggedIn(true);
          // navigate(location.pathname);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsPreloaderLoading(false));
    }
  };

  useEffect(() => {
    setIsPreloaderLoading(true);
    loggedIn &&
      Promise.all([
        moviesApi.getUserInfo(),
        mainApi.getMovies(),
        moviesApi.getSavedMovies(),
      ])
        .then(([userData, initialMovies, savedArray]) => {
          setCurrentUser(userData);
          setMoviesForRender(initialMovies);
          setSavedMovies(savedArray);
          // localStorage.setItem('savedMoviesArray', JSON.stringify(savedArray));
        })
        .catch((err) => console.log(err))
        .finally(() => setIsPreloaderLoading(false));
  }, [loggedIn]);

  // const localSavedMovies = localStorage.getItem('savedMoviesArray');
  // useEffect(() => {
  //   if (localSavedMovies) {
  //     setSavedMovies(JSON.parse(localSavedMovies));
  //   }
  // }, [localSavedMovies]);
  //----------------------------------------------------
  // React.useEffect(() => {
  //   loggedIn &&
  //     Promise.all([
  //       mainApi.getUserInfo(),
  //       moviesApi.getAllMovies(),
  //       mainApi.getSavedMovies(),
  //     ])
  //       .then(([userData, initialMovies, savedArray]) => {
  //         setCurrentUser(userData);
  //         setMovies(initialMovies);
  //         setIsMoviesError(false);
  //         setSavedMovies(savedArray);
  //         localStorage.setItem("savedMoviesArray", JSON.stringify(savedArray));
  //       })
  //       .catch((err) => {
  //         console.error(`Ошибка: ${err}`);
  //         setIsMoviesError(true);
  //       });
  // }, [loggedIn]);

  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("searchedMoviesSaved");
    setMoviesForRender([]);
    setSavedMovies([]);
    setLoggedIn(false);
    setFilterMovies([]);
    setErrorMessage("");
    setIsFilterChecked(false);
    setIsFilterCheckedInSaved(false);
    setCurrentUser(false);
    setErrorMessageProfile(false);
    navigate("/", { replace: true });
  };
  //9999999начало!!
  // useEffect(() => {
  //   setIsPreloaderLoading(true);
  //   Promise.all([moviesApi.getUserInfo(), moviesApi.getSavedMovies()])
  //     .then(([data, movies]) => {
  //       setCurrentUser(data.user);
  //       setSavedMovies(movies);
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => setIsPreloaderLoading(false));
  // }, [loggedIn]);

  useEffect(() => {
    setIsPreloaderLoading(true);
    if (location.pathname === "/saved-movies") {
      moviesApi
        .getSavedMovies()
        .then((movies) => {
          setNothingFoundInSaved("");
          setIsFilterCheckedInSaved(false);
          setSavedMovies(movies);
        })
        .catch((err) => console.log(err));
    } else if (location.pathname === "/movies") {
      if (localStorage.isFilterChecked === "true") {
        setIsFilterChecked(true);
      } else setIsFilterChecked(false);
    } else if (location.pathname === "/profile") {
      setIsEditing(false);
      setErrorMessageProfile("");
    }
    setIsPreloaderLoading(false);
  }, [location]);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  useEffect(() => {
    setMoviesAmounts();
    if (localStorage.renderedMovies) {
      setMoviesForRender(JSON.parse(localStorage.renderedMovies));
    }
  }, [windowSize]);

  function setMoviesAmounts() {
    if (windowSize.innerWidth > SCREEN_WIDTH_768) {
      setFirstMoviesAmount(LARGE_MOVIES_AMOUNT);
      setAddMoviesAmount(ADDITIONAL_LARGE_MOVIES_AMOUNT);
    } else if (windowSize.innerWidth > SCREEN_WIDTH_480) {
      setFirstMoviesAmount(MEDIUM_MOVIES_AMOUNT);
      setAddMoviesAmount(ADDITIONAL_SMALL_MOVIES_AMOUNT);
    } else {
      setFirstMoviesAmount(SMALL_MOVIES_AMOUNT);
      setAddMoviesAmount(ADDITIONAL_SMALL_MOVIES_AMOUNT);
    }
  }
  //регистрация пользователя
  function handleRegister(formValue) {
    setIsAuthLoading(true);
    auth
      .register(formValue.email, formValue.password, formValue.name)
      .then(() => {
        handleLogin(formValue);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => setIsAuthLoading(false));
  }
  //авторизация
  function handleLogin(formValue) {
    setIsAuthLoading(true);
    auth
      .authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        if (err.statusCode === 400) {
          setErrorMessage(err.validation.body.message);
        } else {
          setErrorMessage(err.message);
        }
      })
      .finally(() => setIsAuthLoading(false));
  }

  function closeBurgerMenu() {
    setIsBurgerMenuOpen(false);
  }

  function handleBurgerClick() {
    if (isBurgerMenuOpen) {
      setIsBurgerMenuOpen(false);
    } else setIsBurgerMenuOpen(true);
  }

  function handleFilterMovies(checkbox, data, inputData) {
    if (checkbox) {
      return data.filter(
        (movie) =>
          movie.duration < SHORT_FILM_DURATION &&
          movie.nameRU.toLowerCase().includes(inputData.toLowerCase())
      );
    } else {
      return data.filter((movie) =>
        movie.nameRU.toLowerCase().includes(inputData.toLowerCase())
      );
    }
  }

  function handleCompareMovies(filteredArr) {
    filteredArr.forEach((filterMovie) => {
      savedMovies.forEach((savedMovie) => {
        if (filterMovie.id === savedMovie.movieId) {
          filterMovie.isSaved = true;
        }
      });
    });
  }

  function handleRenderMovies(filteredArr) {
    if (filteredArr.length === 0) {
      localStorage.setItem("nothingFound", "Ничего не найдено");
      localStorage.setItem("renderedMovies", "");
    } else {
      setFilterMovies(filteredArr);
      let renderedMovies =
        filteredArr.slice(0, firstMoviesAmount) || filteredArr;
      setMoviesForRender(renderedMovies);
      localStorage.setItem("renderedMovies", JSON.stringify(renderedMovies));
      localStorage.setItem("nothingFound", "");
    }
    if (filteredArr.length <= firstMoviesAmount) {
      setIsFuther(false);
    } else setIsFuther(true);
  }

  function handleFilterCheck(checked) {
    if (checked) {
      localStorage.setItem("isFilterChecked", true);
    } else localStorage.setItem("isFilterChecked", false);
    if (localStorage.input) {
      setIsLoading(true);
      mainApi
        .getMovies()
        .then((data) => {
          let filtered = handleFilterMovies(checked, data, localStorage.input);
          handleCompareMovies(filtered);
          handleRenderMovies(filtered);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }

  function handleMovieSearch(input) {
    setIsLoading(true);
    localStorage.setItem("input", input.input);
    mainApi
      .getMovies()
      .then((data) => {
        let filtered = handleFilterMovies(
          localStorage.isFilterChecked === "true",
          data,
          input.input
        );
        handleCompareMovies(filtered);
        handleRenderMovies(filtered);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleFutherMovieRender() {
    setMoviesForRender(
      filterMovies.slice(0, moviesForRender.length + addMoviesAmount) ||
        filterMovies
    );
    if (filterMovies.length <= moviesForRender.length + addMoviesAmount) {
      setIsFuther(false);
    } else setIsFuther(true);
  }

  function handleSavedFilterCheck(checked) {
    setIsLoading(true);
    moviesApi
      .getSavedMovies()
      .then((data) => {
        let filtered = handleFilterMovies(checked, data, isInputInSaved);
        if (filtered.length === 0) {
          setNothingFoundInSaved("Ничего не найдено");
        } else {
          setNothingFoundInSaved("");
          setSavedMovies(filtered);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleSavedMovieSearch(input) {
    setIsLoading(true);
    setIsInputInSaved(input.input);
    moviesApi
      .getSavedMovies()
      .then((data) => {
        let filtered = handleFilterMovies(
          isFilterCheckedInSaved,
          data,
          input.input
        );
        if (filtered.length === 0) {
          setNothingFoundInSaved("Ничего не найдено");
        } else {
          setNothingFoundInSaved("");
          setSavedMovies(filtered);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }
  //сохранения фильма
  function handleSaveMovie(movie) {
    if (movie.isSaved) {
      let movieForDelete = savedMovies.find((mov) => mov.movieId === movie.id);
      moviesApi
        .deleteMovie(movieForDelete?._id)
        .then((newMovie) => {
          movie.isSaved = false;
          let renderedMovies = moviesForRender.map((mov) =>
            mov.id === movie.id ? movie : mov
          );
          localStorage.setItem(
            "renderedMovies",
            JSON.stringify(renderedMovies)
          );
          setMoviesForRender(renderedMovies);
          setSavedMovies(
            savedMovies.filter(
              (mov) => mov.movieId !== newMovie.myMovie.movieId
            )
          );
        })
        .catch((err) => console.log(err));
    } else {
      moviesApi
        .saveMovie(movie)
        .then((newMovie) => {
          movie.isSaved = true;
          setSavedMovies([...savedMovies, newMovie]);
          let renderedMovies = moviesForRender.map((mov) =>
            mov.id === newMovie.movieId ? movie : mov
          );
          localStorage.setItem(
            "renderedMovies",
            JSON.stringify(renderedMovies)
          );
          setMoviesForRender(renderedMovies);
        })
        .catch((err) => console.log(err));
    }
  }
 
  function handleDeleteMovie(movie) {
    moviesApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((mov) => mov._id !== movie._id));
        movie.isSaved = false;
        let renderedMovies = moviesForRender.map((mov) =>
          mov.id === movie.movieId ? movie : mov
        );
        localStorage.setItem("renderedMovies", JSON.stringify(renderedMovies));
        setMoviesForRender(renderedMovies);
      })
      .catch((err) => console.log(err));
  }

  //===
  function onEditProfileSubmit(formValue) {
    setIsLoading(true);
    moviesApi
      .editProfile(formValue)
      .then((data) => {
        setCurrentUser(data);
        setErrorMessageProfile("");
        setIsEditing(false);
        alert("Данные профиля обновлены");
      })
      .catch((err) => {
        setErrorMessageProfile(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return isPreloaderLoading ? (
    <Preloader />
  ) : (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header
          handleBurgerClick={handleBurgerClick}
          isBurgerOpen={isBurgerMenuOpen}
          onClose={closeBurgerMenu}
          loggedIn={loggedIn}
        />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  element={Movies}
                  isLoading={isLoading}
                  filterMovies={moviesForRender}
                  onFilterCheckbox={handleFilterCheck}
                  onMovieSearch={handleMovieSearch}
                  isChecked={isFilterChecked}
                  setIsChecked={setIsFilterChecked}
                  onSaveMovie={handleSaveMovie}
                  onMore={handleFutherMovieRender}
                  isFuther={isFuther}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  isLoading={isLoading}
                  savedMovies={savedMovies}
                  onFilterCheckbox={handleSavedFilterCheck}
                  isChecked={isFilterCheckedInSaved}
                  setIsChecked={setIsFilterCheckedInSaved}
                  onMovieSearch={handleSavedMovieSearch}
                  onDeleteMovie={handleDeleteMovie}
                  nothingFound={nothingFoundInSaved}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={Profile}
                  isLoading={isLoading}
                  onLogout={handleLogout}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  buttonDisabled={buttonDisabled}
                  setButtonDisabled={setButtonDisabled}
                  onEditProfileSubmit={onEditProfileSubmit}
                  errorMessageProfile={errorMessageProfile}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  handleRegister={handleRegister}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  isAuthLoading={isAuthLoading}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  handleLogin={handleLogin}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  isAuthLoading={isAuthLoading}
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
