import { driver, expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';
import SecurePage from '../pageobjects/secure.page.js';

describe('Swag Labs Mobile App Automation', async () => {

    describe("Verify Locked Out User", () => {
      it("should display an error message for a locked-out user", async () => {
        await driver.activateApp("com.swaglabsmobileapp");
        await LoginPage.loginAsLockedOutUser();
        await expect(LoginPage.errorMessage).toBeDisplayed();
        const errorMessageText = await LoginPage.errorMessage.getText();
        expect(errorMessageText).toBe("Sorry, this user has been locked out.");
        
      });
    });


    describe("Verify order place successfully", () => {
        it("should succeessfully login", async () => {
            await driver.activateApp("com.swaglabsmobileapp");
            await LoginPage.loginAsValidUser();
            await expect(LoginPage.homePageElement).toBeDisplayed();
        });

        
    });
    

});
