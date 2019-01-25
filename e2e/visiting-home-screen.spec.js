
describe('Visiting home screen', () => {
    beforeEach(async () => {
        await device.reloadReactNative();
    });

    describe('User is not authenticated', () => {
        it('render sign in page', async () => {
            await expect(element(by.id('signinForm'))).toBeVisible();
        })
    })

    describe('User is authenticated using email', () => {
        element(by.id('emailInput')).typeText('muyaszed@gmail.com');
        element(by.id('passwordInput')).typeText('123456');
        element(by.id('signinButton')).tap()
        
        it('render a  list of restaurant', async () => {
            await element(by.id('homeTab')).tap();
            await element(by.id('restaurantList')).swipe('down');
            await expect(element(by.id('restaurantList'))).toBeVisible();
        })
    })
    
});