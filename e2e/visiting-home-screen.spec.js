describe('Visiting home screen', () => {
    it('render a  list of restaurant', async () => {
        await element(by.id('homeTab')).tap();
        await expect(element(by.id('restaurantList'))).toBeVisible();
        await expect(element(by.id('restaurantItem'))).toBeVisible();
    })
});