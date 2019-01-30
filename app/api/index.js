import {API} from 'react-native-dotenv';
import realApi from './realAPI';
import fakeApi from './fakeAPI';

let api;
console.log("status", API);
if(API === 'fake') {
   api = fakeApi;
}else {
   api = realApi;
}

export default api;

// export default realApi;