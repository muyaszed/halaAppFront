
describe('Visiting home screen', () => {
    beforeEach(async () => {
        await device.reloadReactNative();
    });

    describe('User is not authenticated', () => {
        it('render sign in page', async () => {
            await expect(element(by.id('emailInput'))).toBeVisible();
            await expect(element(by.id('passwordInput'))).toBeVisible();
        })
    })

    describe('User is authenticated using email', () => {
        const credentials = {
            email: 'test@email.com',
            password: '123456'
        }
        element(by.id('emailInput')).typeText(credentials.email);
        element(by.id('passwordInput')).typeText(credentials.password);
        element(by.id('signinButton')).tap()
        
        it('render a  list of restaurant', async () => {
            
            await element(by.id('restaurantList')).swipe('down');
            await expect(element(by.id('restaurantList'))).toBeVisible();
        })
    })
    
});