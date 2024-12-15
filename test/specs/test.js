import { driver, expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';
import SecurePage from '../pageobjects/secure.page.js';

describe('Swag Labs Mobile App Automation', async () => {

    describe("Verify Locked Out User", () => {
      it("should display an error message for a locked-out user", async () => {
        await driver.activateApp("com.swaglabsmobileapp");
        await LoginPage.loginAsLockedOutUser();
        await expect(LoginPage.errorMessage).toBeDisplayed();
        expect(errorText).toBe("Sorry, this user has been locked out.");
      });
    });    
});
