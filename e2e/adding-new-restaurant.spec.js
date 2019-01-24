describe("User visit add screen", () => {
    it('can see new restaurant form', async () => {
        await element(by.id('addTab')).tap();
        await expect(element(by.id('restaurantNameInputText'))).toExist();
        await expect(element(by.id('restaurantLocationInputText'))).toExist();
        await expect(element(by.id('restaurantCategoryInputText'))).toExist();
    });

    it('can add new restaurant', async () => {
        const data = {
            id: 1,
            name: 'Tumes Cafe',
            location: 'London',
            category: 'Asian',
            user_id: 1 
        };
        await element(by.id('addTab')).tap();
        await element(by.id('restaurantNameInputText')).typeText(data.name);
        await element(by.id('restaurantLocationInputText')).typeText(data.location);
        await element(by.id('restaurantCategoryInputText')).typeText(data.category);
        await element(by.id('addNewRestaurantButton')).tap();
        await expect(element(by.id('homeScreen'))).toBeVisible();
        await expect(element(by.id('addScreen'))).toBeNotVisible();
        await expect(element(by.label('Tumes Cafe'))).toBeVisible();
        
    })
})