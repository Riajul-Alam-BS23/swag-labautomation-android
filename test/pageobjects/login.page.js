class LoginPage {
    get usernameField() {
      return $("~test-Username");
    }
    get passwordField() {
      return $("~test-Password");
    }
    get loginButton() {
      return $("~test-LOGIN");
    }
    get lockedOutUser() {
      return $('android=new UiSelector().text("locked_out_user")');
    }
    get errorMessage() {
      return $('android=new UiSelector().text("Sorry, this user has been locked out.")');
    }
  
    async scrollToUserList() {
      await driver.execute("mobile: scroll", {
        strategy: "accessibility id",
        selector: "test-standard_user",
      });
    }
  
    async scrollToUsernameField() {
        await driver.execute("mobile: scroll", {
          strategy: "accessibility id",
          selector: "test-Username",
        });
      }
    
    async loginAsLockedOutUser() {
      await this.scrollToUserList();
      await this.lockedOutUser.click();
      await this.scrollToUsernameField();
      await this.loginButton.click();
    }
  
    async getErrorMessageText() {
      return await this.errorMessage.getText();
    }
  }
  
  export default new LoginPage();
  