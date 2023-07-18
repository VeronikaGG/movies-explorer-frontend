// import { BASE__URL } from '../utils/сonstants';

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
    if (!res.ok) {
      return res.json().then((res) => Promise.reject(res));
    }
    return res.json();
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData);
  }

  getUserInfo = () => {
    this._updateHeaders();
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  };

  getSavedMovies = () => {
    return this._request(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: this._headers,
    });
  };

  saveMovie = (props) => {
    return this._request(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        country: props.country,
        director: props.director,
        duration: props.duration,
        year: props.year,
        description: props.description,
        image: props.image,
        trailerLink: props.trailerLink,
        nameRU: props.nameRU,
        nameEN: props.nameEN,
        thumbnail: props.image.formats.thumbnail.url,
        movieId: props.id,
      }),
    });
  };

  deleteMovie = (movieId) => {
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
    });
  };
}

const moviesApi = new MoviesApi({
  baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
});

export default moviesApi;
