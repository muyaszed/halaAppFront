import {AsyncStorage} from 'react-native';

let restaurantList = [
    {
        id: 1,
        name: 'Test Shop',
        location: 'Johore',
        category: 'Johore',
        desc: 'Very well known for its johor and singapore dishes',
        user_id: 1
    },
    {
        id: 2,
        name: 'Test Halal',
        location: 'London',
        category: 'Steak',
        desc: 'No so bad compared to the others',
        user_id: 1
    },
]

export default {
    get: {
        restaurants: () => {
            // console.log('you are in fake api');
            
            return new Promise((resolve, reject) => {
                resolve(restaurantList);
            })
        },
       
    },
    post: {
        restaurants: (data) => {
            return new Promise(async (resolve, reject) => {
                const newData = {
                    id: restaurantList.length+1,
                    name: data.name,
                    location: data.location,
                    category: data.category,
                    desc: data.desc,
                    user_id: 1
    
                }

                const userToken = await AsyncStorage.getItem('userToken');
                if (userToken) {
                    if(data.name != "") {
                        restaurantList.push(newData);
                        resolve('')
                    }else {
                       reject(Error('Name cannot be empty'));
                    }
                    
                }else {
                    reject(Error('User Token required'));
                }
                
            });
        },
        authentication: (credentials) => {
            console.log('in api', credentials);
            const user = {
                email: 'test@test.com',
                password: '123456'
            }
          
            return new Promise((resolve, reject) => {
                if (credentials.password === user.password) {
                    resolve(
                        {
                        auth_token: '654321'
                        }  
                    )
                }else {
                    reject(new Error('User not found'));
                }
                
            }) 
            
        }
    }

}