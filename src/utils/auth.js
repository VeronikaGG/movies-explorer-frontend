class Auth {
  constructor(options) {
    this._baseUrl = options.BASE_URL;
    this._headers = options.headers;
  }
  _updateHeaders() {
    this._headers = {
      ...this._headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
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

  register = (email, password, name) => {
    this._updateHeaders();
    return this._request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password, name }),
    });
  };

  authorize = (email, password) => {
    this._updateHeaders();
    return this._request(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      }
    });
  };

  checkToken = () => {
    this._updateHeaders();
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((data) => data);
  };
}

const auth = new Auth({
  BASE_URL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default auth;
