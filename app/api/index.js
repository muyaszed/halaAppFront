import { API } from 'react-native-dotenv';
import realApi from './api';
import fakeApi from './fakeAPI';

const api = API === 'fake' ? fakeApi : realApi;

export default api;
