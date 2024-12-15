import { driver, expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';
import SecurePage from '../pageobjects/secure.page.js';

describe('Swag Labs Mobile App Automation', async () => {

    describe("Verify Locked Out User", () => {
      it("should display an error message for a locked-out user", async () => {
        // Step 1: Activate the Swag Labs app
        await driver.activateApp("com.swaglabsmobileapp");
    
        // Step 2: Log in as 'locked_out_user'
        await LoginPage.loginAsLockedOutUser();
    
        // Step 3: Assert the locked-out error message
        await expect(LoginPage.errorMessage).toBeDisplayed();
    
        // // Optional: Print the error message for debugging
        // const errorText = await LoginPage.getErrorMessageText();
        // console.log("Error Message: ", errorText);
    
        // Verification
        expect(errorText).toBe("Sorry, this user has been locked out.");
      });
    });    
});
