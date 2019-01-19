export default {
    get: {
        restaurants: () => {
            return fetch('http://localhost:3000/restaurants')
                   .then(response => response.json())
        },

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
    }
}