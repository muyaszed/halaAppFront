describe('Visiting single restaurant page', () => {
    beforeAll(async() => {
        await device.reloadReactNative();
        await element(by.id('emailInput')).typeText('test@test.com');
        await element(by.id('passwordInput')).typeText('123456');
        await element(by.id('signinButton')).tap()
    });

    afterAll(async() => {
        await element(by.id('profileTab')).tap();
         await element(by.id('logoutButton')).tap();

    });

    it('shows restaurant details', async() => {
        await element(by.label('Test Shop')).tap();
        await expect(element(by.id('restaurantDesc'))).toBeVisible();

    });
})