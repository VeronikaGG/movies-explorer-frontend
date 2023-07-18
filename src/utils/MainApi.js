class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return res.text().then((text) => {
      return Promise.reject({
        statusError: res.statusCode,
        error: JSON.parse(text).message,
      });
    });
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData);
  }

  getMovies = () => {
    // this._updateHeaders();
    return this._request(`${this._baseUrl}`, {
      headers: this._headers,
    });
  };
}
const mainApi = new MainApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
