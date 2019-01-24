export default {
    get: {
        restaurants: () => {
            console.log('you are in real api');
            const myHeaders = new Headers({
                "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE1NDg0MTI4MDh9.xKWIq824BWmNkJC2wkEgG0U3GSvTshMfbOXKNOLwwA0"
            });
            return fetch('http://localhost:3000/restaurants', {
                        method: 'GET',
                        mode: 'cors',
                        headers: myHeaders
                    }).then(res => {
                        return res.json();
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
                    })
        }
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
    }
}