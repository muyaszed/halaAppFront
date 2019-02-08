/* eslint-env detox/detox, mocha */

describe('Visiting home screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe('User is not authenticated', () => {
    it('render sign in page', async () => {
      await expect(element(by.id('emailInput'))).toBeVisible();
      await expect(element(by.id('passwordInput'))).toBeVisible();
    });
  });

  describe('User logging in using valid credentials', () => {
    const credentials = {
      email: 'test@test.com',
      password: '123456',
    };

    it('render navigation and all screens', async () => {
      await element(by.id('emailInput')).typeText(credentials.email);
      await element(by.id('passwordInput')).typeText(credentials.password);
      await element(by.id('signinButton')).tap();

      await expect(element(by.id('restaurantList'))).toBeVisible();
      await expect(element(by.id('homeTab'))).toBeVisible();
      await expect(element(by.id('addTab'))).toBeVisible();
      await expect(element(by.id('profileTab'))).toBeVisible();
    });

    it('display Add screen when add tab is press', async () => {
      await element(by.id('addTab')).tap();
      await expect(element(by.id('addScreen'))).toBeVisible();
      await expect(element(by.id('homeScreen'))).toBeNotVisible();
      await expect(element(by.id('profileScreen'))).toBeNotVisible();
    });

    it('display Profile screen when profile tab is press', async () => {
      await element(by.id('profileTab')).tap();
      await expect(element(by.id('profileScreen'))).toBeVisible();
      await expect(element(by.id('addScreen'))).toBeNotVisible();
      await expect(element(by.id('homeScreen'))).toBeNotVisible();
    });

    it('user able to logout', async () => {
      await element(by.id('profileTab')).tap();
      await element(by.id('logoutButton')).tap();
      await expect(element(by.id('profileScreen'))).toBeNotVisible();
    });
  });

  describe.only('User logging in with invalid credentials', () => {
    const credentials = {
      email: 'test@test.com',
      password: 'wrongpassword',
    };

    it('error message will pops up', async () => {
      await element(by.id('emailInput')).typeText(credentials.email);
      await element(by.id('passwordInput')).typeText(credentials.password);
      await element(by.id('signinButton')).tap();

      await expect(element(by.label('User not found'))).toBeVisible();
      await element(by.text('OK')).tap();
      await expect(element(by.label('User not Found'))).toBeNotVisible();
    });
  });
});
