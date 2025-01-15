import {test, expect} from "@playwright/test";
import path from 'path';

const UI_URL = "http://localhost:5173/"

test.beforeEach(async({ page }) => {
    await page.goto(UI_URL);
  
    //get the sign in button
    await page.getByRole("link", {name:"Sign In"}).click();
  
    await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();
  
    await page.locator("[name=email]").fill("test@gmail.com");
    await page.locator("[name=password]").fill("Abcd@1234");
    await page.getByRole("button", {name: "SignIn"}).click();
    
    await expect(page.getByText("SignIn successfull !")).toBeVisible();
});

test("should allow user to add a hotel", async ({page}) => {
  const testhotel = `Test Hotel${Math.floor(Math.random() *90000) + 10000}`;
  await page.goto(`${UI_URL}add-hotel`);
  await page.locator('[name="name"]').fill(testhotel);
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page.locator('[name="description"]').fill("This is a description for the Test Hotel");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]',"3");

  await page.getByText("Budget").click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("4");

  await page.setInputFiles('[name="imageFiles"]',[
    path.join(__dirname, "files","1.jpg"),
    path.join(__dirname, "files","2.jpg"),
  ])

  await page.getByRole('button', {name: "Save"}).click();
  await page.waitForSelector('text="Hotel Saved!"', { state: "visible", timeout: 10000 });
  await expect(page.getByText("Hotel Saved!")).toBeVisible();

});