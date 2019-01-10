describe('Visiting home screen', () => {
    it('render a  list of restaurant', async () => {
        await element(by.id('homeTab')).tap();
        await element(by.id('restaurantList')).swipe('down');
        await expect(element(by.id('restaurantList'))).toBeVisible();
    })
});