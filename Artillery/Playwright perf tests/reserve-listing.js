// @ts-check

const {expect} = require("@playwright/test");

async function reserveListingFlow(page, vuContext, events, test) {

    const {step} = test;

    await step("Navigate to airbnb website", async () => {
        await page.goto('https://www.airbnb.com/');
    });
    await step("Select Tel Aviv as the destination", async () => {
        await page.getByTestId('structured-search-input-field-query').click();
        await page.getByTestId('structured-search-input-field-query').fill('Tel Aviv');
        await page.getByTestId('option-0').getByText('Tel Aviv-Yafo, Tel Aviv').click();
    })

    await step("Select listing date: May 30th to May 31th", async () => {
        await page.getByLabel('30, Thursday, May').click();
        await page.getByLabel('31, Friday, May').click();
    })

    await step("Select 2 adults, 1 child and 1 infant and click search", async () => {
        await page.getByTestId('structured-search-input-field-guests-button').click();
        await page.getByTestId('stepper-adults-increase-button').click();
        await page.getByTestId('stepper-adults-increase-button').click();
        await page.getByTestId('stepper-children-increase-button').click();
        await page.getByTestId('stepper-infants-increase-button').click();
        await page.getByTestId('structured-search-input-search-button').click();
    })

    await step("Select the first option, reserve listing and validate checkout page", async () => {
        const page1Promise = page.waitForEvent('popup');
        await page.locator('.rfexzly').first().click();
        const page1 = await page1Promise;
        await page1.getByRole('button', {name: 'Reserve'}).click();
        await expect(page1.getByRole('heading', {name: 'Request to book'})).toBeVisible();
    })

}

module.exports = {reserveListingFlow};