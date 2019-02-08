import { AsyncStorage } from 'react-native';

const restaurantList = [
  {
    id: 1,
    name: 'Test Shop',
    location: 'Johore',
    category: 'Johore',
    desc: 'Very well known for its johor and singapore dishes',
    user_id: 1,
  },
  {
    id: 2,
    name: 'Test Halal',
    location: 'London',
    category: 'Steak',
    desc: 'No so bad compared to the others',
    user_id: 1,
  },
];

const userToken = AsyncStorage.getItem('userToken');

export default {
  get: {
    restaurants: () => Promise((resolve) => {
      resolve(restaurantList);
    }),
  },
  post: {
    restaurants: data => Promise((resolve, reject) => {
      const newData = {
        id: restaurantList.length + 1,
        name: data.name,
        location: data.location,
        category: data.category,
        desc: data.desc,
        user_id: 1,
      };
      if (userToken) {
        if (data.name !== '') {
          restaurantList.push(newData);
          resolve('');
        } else {
          reject(Error('Name cannot be empty'));
        }
      } else {
        reject(Error('Token is required'));
      }
    }),
    authentication: credentials => Promise((resolve, reject) => {
      const user = {
        email: 'test@test.com',
        password: '123456',
      };
      if (credentials.password === user.password) {
        resolve({
          auth_token: '654321',
        });
      } else {
        reject(Error('User not found'));
      }
    }),
  },
};
