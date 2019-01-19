export default {
    get: {
        restaurants: () => {
            return fetch('http://localhost:3000/restaurants')
                   .then(response => response.json())
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