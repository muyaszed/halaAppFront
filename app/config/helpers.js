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
