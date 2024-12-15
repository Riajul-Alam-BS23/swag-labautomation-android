// import { $ } from '@wdio/globals'
// import Page from './page.js';

// /**
//  * sub page containing specific selectors and methods for a specific page
//  */
// class LoginPage extends Page {
//     /**
//      * define selectors using getter methods
//      */
//     get inputUsername () {
//         return $('#username');
//     }

//     get inputPassword () {
//         return $('#password');
//     }

//     get btnSubmit () {
//         return $('button[type="submit"]');
//     }

//     /**
//      * a method to encapsule automation code to interact with the page
//      * e.g. to login using username and password
//      */
//     async login (username, password) {
//         await this.inputUsername.setValue(username);
//         await this.inputPassword.setValue(password);
//         await this.btnSubmit.click();
//     }

//     /**
//      * overwrite specific options to adapt it to page object
//      */
//     open () {
//         return super.open('login');
//     }
// }

// export default new LoginPage();


// login.page.js
class LoginPage {
    // Locators
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
  
    // Methods
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
  