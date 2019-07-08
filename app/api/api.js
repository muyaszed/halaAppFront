import fetch from 'cross-fetch';
import Config from 'react-native-config';

export default {
  get: {
    restaurants: token => fetch(`${Config.API_ADDRESS_DEV}/restaurants`, {
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
    restaurant: (token, restaurantId) => fetch(`${Config.API_ADDRESS_DEV}/restaurants/${restaurantId}`, {
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
    reviews: (token, id) => fetch(`${Config.API_ADDRESS_DEV}/restaurants/${id}/reviews`, {
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
    user: (token, id) => fetch(`${Config.API_ADDRESS_DEV}/users/${id}`, {
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
    user: credentials => fetch(`${Config.API_ADDRESS_DEV}/signup`, {
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
    restaurant: (data, token) => fetch(`${Config.API_ADDRESS_DEV}/restaurants`, {
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
          
          throw err;
        });
      }
    }),

    bookmark: (token, restaurantId, userId) => fetch(`${Config.API_ADDRESS_DEV}/restaurants/${restaurantId}/${userId}/bookmark_restaurant`, {
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
          
          throw err;
        });
      }
    }),

    unbookmark: (token, restaurantId, userId) => fetch(`${Config.API_ADDRESS_DEV}/restaurants/${restaurantId}/${userId}/unbookmark_restaurant`, {
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
          
          throw err;
        });
      }
    }),

    checkin: (token, restaurantId, userId) => fetch(`${Config.API_ADDRESS_DEV}/restaurants/${restaurantId}/${userId}/checkin_restaurant`, {
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
          
          throw err;
        });
      }
    }),

    authentication: credentials => fetch(`${Config.API_ADDRESS_DEV}/auth/login`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    }).then((res) => {
      
      if (!res.ok) {
        return res.json().then((err) => {
          
          throw new Error(err.message);
        });
      }
      return res.json();
    }),

    fbAuthentication: token => fetch(`${Config.API_ADDRESS_DEV}/auth/fb_login`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(token),
    }).then((res) => {
      
      if (!res.ok) {
        return res.json().then((err) => {
          
          throw new Error(err.message);
        });
      }
      return res.json();
    }),

    reviews: (token, comment, id) => fetch(`${Config.API_ADDRESS_DEV}/restaurants/${id}/reviews`, {
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
      
      if (!res.ok) {
        return res.json().then((err) => {
          
          throw new Error(err.message);
        });
      }
    }),
  },
  put: {
    review: (token, comment, restaurantId, id) => fetch(`${Config.API_ADDRESS_DEV}/restaurants/${restaurantId}/reviews/${id}`, {
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
      
      if (!res.ok) {
        return res.json().then((err) => {
          
          throw new Error(err.message);
        });
      }
    }),
    avatar: (token, data, id) => fetch(`${Config.API_ADDRESS_DEV}/profiles/${id}`, {
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
      
      if (!res.ok) {
        return res.json().then((err) => {
          
          throw new Error(err.message);
        });
      }
    }),
    profile: (token, data, id) => fetch(`${Config.API_ADDRESS_DEV}/profiles/${id}`, {
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
      
      if (!res.ok) {
        return res.json().then((err) => {
          
          throw new Error(err.message);
        });
      }
    }),
    restaurant: (data, token, id) => fetch(`${Config.API_ADDRESS_DEV}/restaurants/${id}`, {
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
      
      if (!res.ok) {
        return res.json().then((err) => {
          
          throw new Error(err.message);
        });
      }
    }),
    user: (data, token, id) => fetch(`${Config.API_ADDRESS_DEV}/users/${id}`, {
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
      
      if (!res.ok) {
        return res.json().then((err) => {
          
          throw new Error(err.message);
        });
      }
    }),
  },

  delete: {
    review: (token, restaurantId, id) => fetch(`${Config.API_ADDRESS_DEV}/restaurants/${restaurantId}/reviews/${id}`, {
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
      
      if (!res.ok) {
        return res.json().then((err) => {
          
          throw new Error(err.message);
        });
      }
    }),
  },
};
