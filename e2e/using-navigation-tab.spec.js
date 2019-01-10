describe.only('View Navigation tab', () => {
    it('display all tabs when app started', async () => {
        await expect(element(by.id('homeTab'))).toBeVisible();
        await expect(element(by.id('addTab'))).toBeVisible();
        await expect(element(by.id('profileTab'))).toBeVisible();
    })

    
});

describe.only('Navigate to other screens', () => {
    it('display Home screen when home tab is press', async () => {
        await element(by.id('homeTab')).tap();
        await expect(element(by.id('homeScreen'))).toBeVisible();
        await expect(element(by.id('addScreen'))).toBeNotVisible();
        await expect(element(by.id('profileScreen'))).toBeNotVisible();

    })

    it('display Add screen when add tab is press', async () => {
        await element(by.id('addTab')).tap();
        await expect(element(by.id('addScreen'))).toBeVisible();
        await expect(element(by.id('homeScreen'))).toBeNotVisible();
        await expect(element(by.id('profileScreen'))).toBeNotVisible();
    })

    it('display Profile screen when profile tab is press', async () => {
        await element(by.id('profileTab')).tap();
        await expect(element(by.id('profileScreen'))).toBeVisible();
        await expect(element(by.id('addScreen'))).toBeNotVisible();
        await expect(element(by.id('homeScreen'))).toBeNotVisible();
    })
})