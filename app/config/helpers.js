import { AsyncStorage } from 'react-native';

export const getToken = () => AsyncStorage.getItem('userToken');
export const test = () => console.log('Test');
