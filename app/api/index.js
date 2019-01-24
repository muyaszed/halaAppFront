import Config from 'react-native-config';
import realApi from './api';
import fakeApi from './fakeapi';

let api;
// if(env.API_FAKE === 'fake') {
   api = fakeApi;
// }else {
//    api = realApi;
// }

export default api;