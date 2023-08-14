// import { BASE_URL, API_URL } from "../utils/сonstants";

// // Функция для обработки ответа от сервера
// const handleResponse = (res) => {
//   if (res.ok) {
//     return res.json();
//   }
//   return res.json().then((data) => Promise.reject(data));
// };

// const makeRequest = async (url, method, body, headers = {}) => {
//   const jwt = localStorage.getItem("jwt");

//   if (!jwt) {
//     // Обработка отсутствия токена, например, перенаправление на страницу входа
//     // Или выброс исключения
//     throw new Error("Токен отсутствует");
//   }
//   console.log("Request URL:", url); // Добавьте эту строку
//   console.log("Request headers:", headers); // Добавьте эту строку
//   try {
//     const response = await fetch(url, {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("jwt")}`,

//         ...headers,
//       },
//       body: body ? JSON.stringify(body) : null,
//     });

//     return handleResponse(response);
//   } catch (error) {
//     console.error("Request error:", error);
//     throw error;
//   }
// };

// export const registerUser = async (data) => {
//   try {
//     return await makeRequest(`${BASE_URL}/signup`, "POST", {
//       name: data.name,
//       email: data.email,
//       password: data.password,
//     });
//   } catch (error) {
//     console.error("Register error:", error);
//     throw error;
//   }
// };

// export const loginUser = async (data) => {
//   try {
//     const res = await makeRequest(`${BASE_URL}/signin`, "POST", {
//       email: data.email,
//       password: data.password,
//     });
//     localStorage.setItem("jwt", res.token);
//     return res;
//   } catch (error) {
//     console.error("Login error:", error);
//     throw error;
//   }
// };

// // Получение информации о текущем пользователе
// export const getCurrentUserInfo = () => {
//   return makeRequest(`${BASE_URL}/users/me`, "GET");
// };

// // Обновление информации о текущем пользователе
// export const updateUserInfo = (data) => {
//   return makeRequest(`${BASE_URL}/users/me`, "PATCH", {
//     name: data.name,
//     email: data.email,
//   });
// };

// // Получение списка сохраненных фильмов
// export const getSavedMovies = () => {
//   return makeRequest(`${BASE_URL}/movies`, "GET");
// };

// // Добавление фильма в список сохраненных
// export const addMovieToSaved = (data) => {
//   return makeRequest(`${BASE_URL}/movies`, "POST", {
//     nameRU: data.nameRU,
//     nameEN: data.nameEN,
//     country: data.country,
//     duration: data.duration,
//     director: data.director,
//     year: data.year,
//     description: data.description,
//     image: `${API_URL}${data.image.url}`,
//     trailerLink: data.trailerLink,
//     thumbnail: `${API_URL}${data.image.formats.thumbnail.url}`,
//     movieId: data.id,
//   });
// };

// // Удаление фильма из списка сохраненных
// export const deleteMovieFromSaved = (movieId) => {
//   return makeRequest(`${BASE_URL}/movies/${movieId}`, "DELETE");
// };
// import { BASE_LINK } from "./constants";

// export default class MainApi {
//   constructor({ url, headers }) {
//     this._url = url;
//     this._headers = headers;
//   }

//   _checkResponse(res) {
//     if (res.ok) {
//       return res.json();
//     }
//     return res.text().then((text) => {
//       return Promise.reject({
//         statusError: res.statusCode,
//         error: JSON.parse(text).message,
//       });
//     });
//   }

//   _request(url, options) {
//     return fetch(url, options).then(this._checkResponse);
//   }

//   registerUser(name, email, password) {
//     return fetch(`${this._url}/signup`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name: `${name}`,
//         email: `${email}`,
//         password: `${password}`,
//       }),
//     }).then(this._checkResponse);
//   }

//   loginUser(email, password) {
//     return fetch(`${this._url}/signin`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email: `${email}`, password: `${password}` }),
//     })
//       .then(this._checkResponse)
//       .then((data) => {
//         if (data.token) {
//           localStorage.setItem("token", data.token);
//           return data;
//         }
//       });
//   }

//   checkToken() {
//     return fetch(`${this._url}/users/me`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     })
//       .then(this._checkResponse)
//       .then((data) => data);
//   }

//   getCurrentUserInfo() {
//     return this._request(`${this._url}/users/me`, {
//       headers: this._headers,
//     });
//   }

//   updateUserInfo(data) {
//     return this._request(`${this._url}/users/me`, {
//       headers: this._headers,
//       method: "PATCH",
//       body: JSON.stringify({
//         name: data.name,
//         email: data.email,
//       }),
//     });
//   }

//   getSavedMovies() {
//     return this._request(`${this._url}/movies`, {
//       headers: this._headers,
//     });
//   }

//   addMovieToSaved(movie) {
//     return this._request(`${this._url}/movies`, {
//       method: "POST",
//       body: JSON.stringify({
//         country: movie.country,
//         director: movie.director,
//         duration: movie.duration,
//         year: movie.year,
//         description: movie.description,
//         image: BASE_LINK + movie.image.url,
//         trailerLink: movie.trailerLink,
//         thumbnail: BASE_LINK + movie.image.formats.thumbnail.url,
//         movieId: movie.id,
//         nameRU: movie.nameRU,
//         nameEN: movie.nameEN,
//       }),
//       headers: this._headers,
//     });
//   }

//   deleteMovieFromSaved(id) {
//     return this._request(`${this._url}/movies/${id}`, {
//       method: "DELETE",
//       headers: this._headers,
//     });
//   }
// }

//---------
import { BASE_URL, API_URL } from "../utils/сonstants";

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

export const registerUser = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
  })
    .then(getResponse)
    .then((data) => {
      return data;
    });
};

export const loginUser = (data) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: data.password, email: data.email }),
  })
    .then(getResponse)
    .then((data) => {
      localStorage.setItem("jwt", data.token);
      const savedToken = localStorage.getItem("jwt");
      if (savedToken === data.token) {
        console.log("Токен успешно сохранен в localStorage");
      } else {
        console.log("Произошла ошибка при сохранении токена");
      }
      return data;
    });
};

export const getCurrentUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
    .then(getResponse)
    .then((data) => {
      return data;
    });
};

export const updateUserInfo = (data) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ name: data.name, email: data.email }),
  })
    .then(getResponse)
    .then((data) => {
      return data;
    });
};

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
    .then(getResponse)
    .then((data) => {
      return data;
    });
};
export const addMovieToSaved = (data) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      nameRU: data.nameRU,
      nameEN: data.nameEN,
      country: data.country,
      duration: data.duration,
      director: data.director,
      year: data.year,
      description: data.description,
      image: `${API_URL}${data.image.url}`,
      trailerLink: data.trailerLink,
      thumbnail: `${API_URL}${data.image.formats.thumbnail.url}`,
      movieId: data.id,
    }),
  }).then(getResponse);
};

export const deleteMovieFromSaved = (movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
    .then(getResponse)
    .then((data) => {
      return data;
    });
};
