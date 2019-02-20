/* eslint-env detox/detox, mocha */

describe('User visit review screen', () => {
    beforeAll(async () => {
      await device.reloadReactNative();
      await element(by.id('emailInput')).typeText('test@test.com');
      await element(by.id('passwordInput')).typeText('123456');
      await element(by.id('signinButton')).tap();
    });
  
    afterAll(async () => {
      await element(by.id('profileTab')).tap();
      await element(by.id('logoutButton')).tap();
    });
  
    it('can add new review', async () => {
      const data = {
        comment: 'This is a new comment',
      };
      await element(by.label('Test Shop')).tap();
      await element(by.id('reviewTab')).tap();
      await element(by.id('addBtn')).tap();
      await element(by.id('addReviewBtn')).tap();
      await expect(element(by.id('newReviewModal'))).toBeVisible();

      await element(by.id('commentInput')).typeText(data.comment);
      await element(by.id('commentBtn')).tap();
      await expect(element(by.label(data.comment))).toBeVisible();
    });
  
    
  });
  