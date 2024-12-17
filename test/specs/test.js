import { driver, expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';
import ProductPage from '../pageobjects/product.page.js';

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

      await ProductPage.filterLowToHigh();
      await ProductPage.addToCartProductOne("Sauce Labs Fleece Jacket");
      const ProductOnePrice = await $(
        '//android.widget.TextView[@text="$49.99"]'
      ).getText();
      console.log("This is Product proce ==> ", ProductOnePrice)
      expect(ProductOnePrice).toBe("$49.99");
      await expect(ProductPage.removeButton).toBeDisplayed();
      await ProductPage.addToCartProductTwo("Sauce Labs Bike Light");
      await expect(ProductPage.removeButton).toBeDisplayed();

      const priceElement = await $('~test-Price');
      await priceElement.waitForDisplayed({ timeout: 5000 });
      const ProductTwoPrice = await priceElement.getText();
      console.log("This is Product price ==> ", ProductTwoPrice);
      expect(ProductTwoPrice).toBe("$9.99");

      await driver.execute("mobile: scroll", {
        direction: "up",
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




      const cartBadge = await $('//android.widget.TextView[@text="2"]');
      await cartBadge.waitForDisplayed({ timeout: 5000 });
      const badgeText = await cartBadge.getText();
      console.log("Cart Badge Count:", badgeText);
      expect(badgeText).toBe("2");




      const cartButton = await $('android=new UiSelector().className("android.widget.ImageView").instance(3)');
      await cartButton.waitForDisplayed({ timeout: 5000 });
      await cartButton.click();
      await driver.pause(2000);

      const productOneInCart = await $('//android.widget.TextView[@text="Sauce Labs Fleece Jacket"]');
      const productTwoInCart = await $('//android.widget.TextView[@text="Sauce Labs Bike Light"]');

      expect(await productOneInCart.isDisplayed()).toBe(true);
      expect(await productTwoInCart.isDisplayed()).toBe(true);

      await driver.execute("mobile: scroll", {
        direction: "down",
        strategy: "-android uiautomator",
        selector: 'new UiSelector().text("CHECKOUT")',
      });

      const checkoutButton = await $('android=new UiSelector().text("CHECKOUT")');
      await checkoutButton.waitForDisplayed({ timeout: 5000 });
      await checkoutButton.click();

      const firstNameField = await $('android=new UiSelector().text("First Name")');
      await firstNameField.waitForDisplayed({ timeout: 5000 });
      await firstNameField.setValue('John');

      const lastNameField = await $('android=new UiSelector().text("Last Name")');
      await lastNameField.waitForDisplayed({ timeout: 5000 });
      await lastNameField.setValue('Doe');

      const zipCodeField = await $('android=new UiSelector().text("Zip/Postal Code")');
      await zipCodeField.waitForDisplayed({ timeout: 5000 });
      await zipCodeField.setValue('12345');

      console.log("Entered First Name, Last Name, and Zip/Postal Code.");

      const continueButton = await $('android=new UiSelector().text("CONTINUE")');
      await continueButton.waitForDisplayed({ timeout: 5000 });

      await continueButton.click();

      console.log("Clicked on the CONTINUE button.");



      await driver.execute("mobile: scroll", {
        direction: "down",
        strategy: "-android uiautomator",
        selector: 'new UiSelector().text("Item total: $59.980000000000004")',
      });

      const itemTotalElement = await $('android=new UiSelector().text("Item total: $59.980000000000004")');

      const itemTotalText = await itemTotalElement.getText();

      expect(itemTotalText).toBe("Item total: $59.980000000000004");


      await driver.execute("mobile: scroll", {
        direction: "down",
        strategy: "-android uiautomator",
        selector: 'new UiSelector().text("FINISH")',
      });

      const finishButton = await $('android=new UiSelector().text("FINISH")');
      await finishButton.waitForDisplayed({ timeout: 5000 });
      await finishButton.click();
      const checkoutCompleteElement = await $('android=new UiSelector().text("CHECKOUT: COMPLETE!")');
      const isCheckoutCompleteDisplayed = await checkoutCompleteElement.getText();
      expect(isCheckoutCompleteDisplayed).toBe("CHECKOUT: COMPLETE!");
    });



  });


});
