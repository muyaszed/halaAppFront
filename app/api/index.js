import Config from 'react-native-config';
import realApi from './api';
import fakeApi from './fakeAPI';

const api = Config.API === 'fake' ? fakeApi : realApi;

export default api;
