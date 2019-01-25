import {API} from 'react-native-dotenv';
import realApi from './api';
import fakeApi from './api.e2e';

let api;
// console.log(API_FAKE);
if(API === 'fake') {
   api = fakeApi;
}else {
   api = realApi;
}

export default api;

// export default realApi;