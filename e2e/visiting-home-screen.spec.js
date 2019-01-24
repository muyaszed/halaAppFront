
describe('Visiting home screen', () => {
    


    it('render sign in page', async () => {
        
        await expect(element(by.label('Tumes Cafe'))).toBeVisible();
    })
    

    // context('User is not authenticated', () => {
    //     it('render sign in page', async () => {
    //         await element(by.id('signinForm')).toBeVisible();
    //     })
    // })

    // context('User is authenticated', () => {
    //     it('render a  list of restaurant', async () => {
    //         await element(by.id('homeTab')).tap();
    //         await element(by.id('restaurantList')).swipe('down');
    //         await expect(element(by.id('restaurantList'))).toBeVisible();
    //     })
    // })
    
});