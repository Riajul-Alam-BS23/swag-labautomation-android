import { driver, expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';
import ProductPage from '../pageobjects/product.page.js';

import SecurePage from '../pageobjects/secure.page.js';

describe('Swag Labs Mobile App Automation', async () => {

  // describe("Verify Locked Out User", () => {
  //   it("should display an error message for a locked-out user", async () => {
  //     await driver.activateApp("com.swaglabsmobileapp");
  //     await LoginPage.loginAsLockedOutUser();
  //     await expect(LoginPage.errorMessage).toBeDisplayed();
  //     const errorMessageText = await LoginPage.errorMessage.getText();
  //     expect(errorMessageText).toBe("Sorry, this user has been locked out.");

  //   });
  // });


  describe("Verify order place successfully", () => {
    it("should succeessfully login", async () => {
      await driver.activateApp("com.swaglabsmobileapp");
      await LoginPage.loginAsValidUser();
      await expect(LoginPage.homePageElement).toBeDisplayed();

      await ProductPage.filterLowToHigh();
      await ProductPage.addToCartProductOne("Sauce Labs Fleece Jacket");
      const ProductOnePrice = await $(
        '//android.widget.TextView[@text="$49.99"]'
      ).getText();
      console.log("This is Product proce ==> ", ProductOnePrice)
      expect(ProductOnePrice).toBe("$49.99");
      await expect(ProductPage.removeButton).toBeDisplayed();
      // await driver.pause(5000);
      await ProductPage.addToCartProductTwo("Sauce Labs Bike Light");
      await expect(ProductPage.removeButton).toBeDisplayed();

      const priceElement = await $('~test-Price');
      await priceElement.waitForDisplayed({ timeout: 5000 });
      const ProductTwoPrice = await priceElement.getText();
      console.log("This is Product price ==> ", ProductTwoPrice);
      expect(ProductTwoPrice).toBe("$9.99");

      await driver.execute("mobile: scroll", {
        direction:"up",
        strategy: "-android uiautomator",
        selector: 'new UiSelector().text("Sauce Labs Bike Light")',
      });
      const productNameElement = await $(
        '//android.widget.TextView[@text="Sauce Labs Bike Light"]'
      );
      await productNameElement.waitForDisplayed({ timeout: 5000 });
      const productName = await productNameElement.getText();
      console.log("This is the product name ==> ", productName);
      expect(productName).toBe("Sauce Labs Bike Light");
  






    });



  });


});
