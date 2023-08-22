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

export const tokenCheck = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(getResponse)
    .then((data) => {
      return data;
    });
};
