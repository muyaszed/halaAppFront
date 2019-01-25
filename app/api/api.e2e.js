export default {
    get: {
        restaurants: () => {
            // console.log('you are in fake api');
            
            return new Promise((resolve, reject) => {
                resolve( [
                    {
                        id: 1,
                        name: 'Test Shop',
                        location: 'Johore',
                        category: 'Johore',
                        user_id: 1
                    }
                ])
            })
        },
        

    }

}