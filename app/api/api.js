import fetch from 'cross-fetch';

export default {
  get: {
    restaurants: token => fetch('http://localhost:3000/restaurants', {
      method: 'GET',
      mode: 'cors',
      headers: {
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
    // Async version
    // restaurants: async () => {
    //     const response = await fetch('http://localhost:3000/restaurants');
    //     return await response.json();
    // },
  },

  post: {
    restaurants: (data, token) => fetch('http://localhost:3000/restaurants', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) {
        res.json().then((err) => {
          console.log(err);
          throw new Error(err.message);
        });
      }
    }),
    // Async version
    // restaurants: async (data) => {
    //     const post = await fetch('http://localhost:3000/restaurants', {
    //                 method: "POST",
    //                 mode: "cors",
    //                 cache: "no-cache",
    //                 credentials: "same-origin",
    //                 headers: {"Content-Type": "application/json"},
    //                 body: JSON.stringify(data)
    //             });
    //     return await post;
    // }
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
  },
};
