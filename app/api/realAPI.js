import { AsyncStorage } from 'react-native';


export default {
    get: {
        restaurants: (token) => {
            
            const myHeaders = new Headers({
                "Authorization": token
            });
            return fetch('http://localhost:3000/restaurants', {
                        method: 'GET',
                        mode: 'cors',
                        headers: myHeaders
                    }).then(res => {
                        if (!res.ok) {
                            return res.text().then(text => {
                                throw Error(text);
                            });
                        }else {
                            return res.json();
                        }
                        
                    })
                   
        },
        //Async version
        // restaurants: async () => {
        //     const response = await fetch('http://localhost:3000/restaurants');
        //     return await response.json();
        // },

    },

    post: {
        restaurants: (data) => {
            return fetch('http://localhost:3000/restaurants', {
                        method: "POST",
                        mode: "cors",
                        cache: "no-cache",
                        credentials: "same-origin",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(data)
                    }).then(res => {
                        if(!res.ok) {
                            return res.text().then(text => {
                                throw Error(text);
                            })
                        }else {
                            return res
                        }
                    })
        },
        //Async version
        // restaurants: async (data) => {
        //     const post = await fetch('http://localhost:3000/restaurants', {
        //                 method: "POST",
        //                 mode: "cors",
        //                 cache: "no-cache",
        //                 credentials: "same-origin",
        //                 headers: {"Content-Type": "application/json"},
        //                 body: JSON.stringify(data)
        //             });
        //     return await post;
        // }
        authentication: (credentials) => {
            return fetch('http://localhost:3000/auth/login', {
                        method: "POST",
                        mode: "cors",
                        cache: "no-cache",
                        credentials: "same-origin",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(credentials)
            }).then(res => {
                console.log('imidiate res', res);
                if(!res.ok) {
                    return res.text().then(text => {
                        throw Error(text);
                    });
                }else {
                    return res.json()
                }
                
                
            })
        }

        
    }
}