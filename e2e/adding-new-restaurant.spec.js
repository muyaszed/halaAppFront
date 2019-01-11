describe("User visit add screen", () => {
    it('can see new restaurant form', async () => {
        await element(by.id('addTab')).tap();
        await expect(element(by.id('restaurantNameInputText'))).toExist();
        await expect(element(by.id('restaurantLocationInputText'))).toExist();
        await expect(element(by.id('restaurantCategoryInputText'))).toExist();
    });

    it.only('can add new restaurant', async () => {
        const data = {
            key: 1,
            name: 'Tumes Cafe',
            location: 'London',
            category: 'Asian' 
        };
        await element(by.id('addTab')).tap();
        await element(by.id('restaurantNameInputText')).typeText(data.name);
        await element(by.id('restaurantLocationInputText')).typeText(data.location);
        await element(by.id('restaurantCategoryInputText')).typeText(data.category);
        await element(by.id('addNewRestaurantButton')).tap();
        await expect(element(by.id('homeScreen'))).toBeVisible();
        await expect(element(by.id('addScreen'))).toBeNotVisible();
        
        
    })
})