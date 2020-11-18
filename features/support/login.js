const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const puppeteer = require("puppeteer");
const { expect } = require("chai");

setDefaultTimeout(60 * 1000);

Given("The user is on the signup page", async function () {
  this.chrome = await puppeteer.launch();
  this.page = await this.chrome.newPage();
  this.page.setDefaultTimeout(0);
  await this.page.goto("https://cp.mombasa.sasalog.com/index.php/apply");
});

When(
  "User fills in their details: {string}, {string}, {string}, {string}, {string} and clicks `Save and Continue`",
  async function (fullname, username, email, password, phoneno) {
    await this.page.type("#sfApplyApply_fullname", fullname);
    await this.page.type("#sfApplyApply_username", username);
    await this.page.type("#sfApplyApply_email", email);
    await this.page.type("#sfApplyApply_email2", email);
    await this.page.type("#sfApplyApply_password", password);
    await this.page.type("#sfApplyApply_password2", password);
    await this.page.type("#sfApplyApply_mobile", phoneno);
    await this.page.select("#sfApplyApply_registeras", "3");
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.click("#submit_app"),
    ]);
  }
  );
  
  When(
    "User fills in additional details: {string}, {string}, {string}, {string}, {string} and clicks `Submit`",
    async function (company, id_passport, company_regno, regno, email) {
      await this.page.type("#element_2", company);
      await this.page.type("#element_5", id_passport);
      await this.page.type("#element_7", company_regno);
      await this.page.type("#element_3", regno);
      await this.page.type("#element_4", email);
      await this.page.select("#element_6", "1");
      await Promise.all([
        this.page.waitForNavigation(),
        this.page.click("#submit_form"),
      ]);
  }
);

Given("The user is on the login page", async function () {
  this.chrome = await puppeteer.launch();
  this.page = await this.chrome.newPage();
  this.page.setDefaultTimeout(0);
  await this.page.goto("https://cp.mombasa.sasalog.com/index.php/login");
});

When(
  "User inputs correct {string} plus {string} and clicks `SignIn`",
  async function (username, password) {
    await this.page.type("#signin_username", username);
    await this.page.type("#signin_password", password);
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.click("form button"),
    ]);
  }
);

Then("Login is successful and user lands on their dashbard", function () {
  const currentUrl = this.page.url();
  expect(currentUrl).to.equal(
    "https://cp.mombasa.sasalog.com/index.php/dashboard"
  );
});
