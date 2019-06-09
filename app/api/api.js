import fetch from 'cross-fetch';

export default {
  get: {
    restaurants: token => fetch('http://localhost:3000/restaurants', {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/vnd.halaldir.v1+json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then((res) => {
      console.log(res);
      if (!res.ok) {
        return res.json().then((err) => {
          console.log(err);
          throw new Error(err.message);
        });
      }
      return res.json();
    }),
    restaurant: (token, restaurantId) => fetch(`http://localhost:3000/restaurants/${restaurantId}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/vnd.halaldir.v1+json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          console.log(err);
          throw new Error(err.message);
        });
      }
      
      return res.json();
    }),
    reviews: (token, id) => fetch(`http://localhost:3000/restaurants/${id}/reviews`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/vnd.halaldir.v1+json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw new Error(err.message);
        });
      }
      return res.json();
    }),
    user: (token, id) => fetch(`http://localhost:3000/users/${id}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/vnd.halaldir.v1+json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw new Error(err.message);
        });
      }
      return res.json();
    }),
  },

  post: {
    user: credentials => fetch('http://localhost:3000/signup', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw new Error(err.message);
        });
      }
      return res.json();
    }),
    restaurant: (data, token) => fetch('http://localhost:3000/restaurants', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/vnd.halaldir.v1+json',
        Authorization: token,
      },
      body: data,
    }).then((res) => {
      if (!res.ok) {
        
        return res.json().then((err) => {
          console.log(err);
          throw err;
        });
      }
    }),

    bookmark: (token, restaurantId, userId) => fetch(`http://localhost:3000/restaurants/${restaurantId}/${userId}/bookmark_restaurant`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/vnd.halaldir.v1+json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          console.log(err);
          throw err;
        });
      }
    }),

    unbookmark: (token, restaurantId, userId) => fetch(`http://localhost:3000/restaurants/${restaurantId}/${userId}/unbookmark_restaurant`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/vnd.halaldir.v1+json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          console.log(err);
          throw err;
        });
      }
    }),

    authentication: credentials => fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    }).then((res) => {
      console.log('imidiate res', res);
      if (!res.ok) {
        return res.json().then((err) => {
          console.log(err);
          throw new Error(err.message);
        });
      }
      return res.json();
    }),
    reviews: (token, comment, id) => fetch(`http://localhost:3000/restaurants/${id}/reviews`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/vnd.halaldir.v1+json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(comment),
    }).then((res) => {
      console.log('Check ok', res);
      if (!res.ok) {
        return res.json().then((err) => {
          console.log(err);
          throw new Error(err.message);
        });
      }
    }),
  },
  put: {
    review: (token, comment, restaurantId, id) => fetch(`http://localhost:3000/restaurants/${restaurantId}/reviews/${id}`, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/vnd.halaldir.v1+json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(comment),
    }).then((res) => {
      console.log('Check ok', res);
      if (!res.ok) {
        return res.json().then((err) => {
          console.log(err);
          throw new Error(err.message);
        });
      }
    }),
    avatar: (token, data, id) => fetch(`http://localhost:3000/profiles/${id}`, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/vnd.halaldir.v1+json',
        // 'Content-Type': 'application/json',
        Authorization: token,
      },
      body: data,
    }).then((res) => {
      console.log('Check ok', res);
      if (!res.ok) {
        return res.json().then((err) => {
          console.log(err);
          throw new Error(err.message);
        });
      }
    }),
    profile: (token, data, id) => fetch(`http://localhost:3000/profiles/${id}`, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/vnd.halaldir.v1+json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log('Check ok', res);
      if (!res.ok) {
        return res.json().then((err) => {
          console.log(err);
          throw new Error(err.message);
        });
      }
    }),
    restaurant: (data, token, id) => fetch(`http://localhost:3000/restaurants/${id}`, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/vnd.halaldir.v1+json',
        Authorization: token,
      },
      body: data,
    }).then((res) => {
      console.log('Check ok', res);
      if (!res.ok) {
        return res.json().then((err) => {
          console.log(err);
          throw new Error(err.message);
        });
      }
    }),
  },

  delete: {
    review: (token, restaurantId, id) => fetch(`http://localhost:3000/restaurants/${restaurantId}/reviews/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/vnd.halaldir.v1+json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then((res) => {
      console.log('Check ok', res);
      if (!res.ok) {
        return res.json().then((err) => {
          console.log(err);
          throw new Error(err.message);
        });
      }
    }),
  },
};
