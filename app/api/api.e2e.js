let restaurantList = [
    {
        id: 1,
        name: 'Test Shop',
        location: 'Johore',
        category: 'Johore',
        user_id: 1
    }
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
            const newData = {
                id: restaurantList.length+1,
                name: data.name,
                location: data.location,
                category: data.category,
                user_id: 1

            }
            restaurantList.push(newData);
            return new Promise((resolve, reject) => {
                resolve('')
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