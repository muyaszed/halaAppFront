describe("User visit add screen", () => {
    beforeAll(async() => {
        await device.reloadReactNative();
        await element(by.id('emailInput')).typeText('test@test.com');
        await element(by.id('passwordInput')).typeText('123456');
        await element(by.id('signinButton')).tap()
    });


    it('can add new restaurant', async () => {
        const data = {
            
            name: 'Tumes Cafe',
            location: 'London',
            category: 'Asian',
            
        };
        await element(by.id('addTab')).tap();
        await element(by.id('restaurantNameInputText')).replaceText(data.name);
        await element(by.id('restaurantLocationInputText')).replaceText(data.location);
        await element(by.id('restaurantCategoryInputText')).replaceText(data.category);
        await element(by.id('addNewRestaurantButton')).tap();
        await expect(element(by.id('homeScreen'))).toBeVisible();
        await expect(element(by.id('addScreen'))).toBeNotVisible();
        await expect(element(by.label('Tumes Cafe'))).toBeVisible();
        
    })
})