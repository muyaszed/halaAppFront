import { API } from 'react-native-dotenv';
import realApi from './api';
import fakeApi from './fakeApi';

const api = API === 'fake' ? fakeApi : realApi;

export default api;
