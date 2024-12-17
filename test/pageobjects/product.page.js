class ProductPage {
    get filterButton() {
        return $('android=new UiSelector().description("test-Modal Selector Button")');
    }

    get lowToHighFilter() {
        return $('android=new UiSelector().text("Price (low to high)")');
    }

    get addToCartButtonOne() {
        return $('android=new UiSelector().description("test-ADD TO CART").instance(1)');
    }
    get removeButton() {
        return $('android=new UiSelector().description("test-REMOVE")');
    }

    get cartIcon() {
        return $('//android.widget.TextView[@text="2"]');
    }

    async filterLowToHigh() {
        await this.filterButton.click();
        await this.lowToHighFilter.click();
    }

    async scrollToProduct(product) {
        await driver.execute("mobile: scroll", {
            strategy: "accessibility id",
            selector: product,
        });
    }
    async addToCartProductOne(productName) {
        await this.scrollToProduct(productName);
        await this.addToCartButtonOne.click();
        await this.removeButton.waitForDisplayed();
    }
    async addToCartProductTwo(productName) {
        await driver.execute("mobile: scroll", {
            direction: "up",
            strategy: "-android uiautomator",
            selector: `new UiSelector().text("Sauce Labs Bike Light")`,
        });
        const productTwoName = await $(
            'android=new UiSelector().text("Sauce Labs Bike Light")'
        );
        await productTwoName.click();

        await driver.pause(2000);
        await driver.execute("mobile: scroll", {
            direction: "down",
            strategy: "-android uiautomator",
            selector: `new UiSelector().text("ADD TO CART")`,
        });
        await driver.pause(2000);
        const addToCartProductTwo = await $("~test-ADD TO CART");
        await addToCartProductTwo.click();
    }

    async openCart() {
        await this.cartIcon.click();
    }

}

export default new ProductPage();
