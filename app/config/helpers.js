import { AsyncStorage } from 'react-native';

// eslint-disable-next-line import/prefer-default-export
export const getToken = () => AsyncStorage.getItem('userToken');

export const getCurrentUser = () => AsyncStorage.getItem('currentUser');
// export const updateCurrentUser = async () => {
//   try {
//     const user = await AsyncStorage.getItem('currentUser');
//   } catch (error) {
//     console.log(error);
//   }
// };

export const setItemToAsyncStore = async (itemDesc, item) => {
  try {
    await AsyncStorage.setItem(itemDesc, item);
  } catch (error) {
    throw Error(error);
  }
};

export const removeItemFromAsyncStore = async (itemDesc) => {
  try {
    await AsyncStorage.removeItem(itemDesc);
  } catch (error) {
    throw Error(error);
  }
};

export const imageToFormData = (name, image) => {
  const form = new FormData();

  form.append(name, {
    name: image.fileName,
    type: image.type,
    uri: image.uri.replace('file://', ''),
  });
  return form;
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const deg2rad = deg => deg * (Math.PI / 180);

  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  }
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const dist = R * c; // Distance in km
  return dist;
};

export const getPosition = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(resolve, reject, {
    enableHighAccuracy: false,
    timeout: 200000,
    maximumAge: 1000,
  });
});
