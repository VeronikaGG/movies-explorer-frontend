import { BASE__URL } from '../utils/сonstants';

class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  _updateHeaders() {
    this._headers = {
      ...this._headers,
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  _request(url, options) {
    return fetch(url, options);
  }

  getUserInfo = () => {
    this._updateHeaders();
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
    .then(this._getResponseData)
    .then((data) => {
      return data;
    });
  };

  getSavedMovies = () => {
    this._updateHeaders();
    return this._request(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._getResponseData)
    .then((data) => {
      return data;
    });
  };

  saveMovie = (props) => {
    this._updateHeaders();
    return this._request(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        country: props.country,
        director: props.director,
        duration: props.duration,
        year: props.year,
        description: props.description,
        image: `${BASE__URL}${props.image.url}`,
        trailerLink: props.trailerLink,
        thumbnail: `${BASE__URL}${props.url}`,
        movieId: props.id,
        nameRU: props.nameRU,
        nameEN: props.nameEN,
      }),
    })
    .then(this._getResponseData);
  };

  deleteMovie = (movieId) => {
    this._updateHeaders();
    return this._request(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  };

  editProfile = (props) => {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: props.name,
        email: props.email,
      }),
    })
    .then(this._getResponseData);
  };
}

const moviesApi = new MoviesApi({
  baseUrl: "https://api.veronikagg-diploma.nomoredomains.rocks",
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
});

export default moviesApi;
