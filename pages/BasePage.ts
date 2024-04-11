import {expect, Page} from "@playwright/test";

export default class BasePage {

    constructor(public page: Page) {
    }

    /**
     * Loads the application by navigating to the specified URL.
     * @param url - The URL of the application to load.
     */

    public async loadApplication(url: string) {
        await this.page.goto(url);
    }

    /**
     * Validates that the current URL contains the specified substring.
     * @param url - The substring to check for in the current URL.
     */

    public async validateUrl(url: string) {
        expect(this.page.url()).toContain(url);
    }

    /**
     * Selects a value from a dropdown element based on its text content.
     * @param dropdownElement - The selector of the dropdown element
     * @param value - The text content of the option to select from the dropdown.
     */

    public async selectFromDropdown(dropdownElement: string, value: string) {
        const dropDownOptions = await this.page.locator(dropdownElement).all();
        for (let dropdownOption of dropDownOptions) {
            const optionText = await dropdownOption.innerText();
            if (optionText.trim() === value) {
                await dropdownOption.click();
                return;
            }
        }
    }

    /**
     * Validates that the text content of a specified element contains the expected text.
     * @param element - The selector of the element whose text content will be validated.
     * @param expectedText - The expected text content to check for.
     */

    public async validateTextContent(element: string, expectedText: string) {
        const locator = this.page.locator(element);
        await expect.soft(locator).toContainText(expectedText);
    }

    /**
     * Retrieves the text content of a specified element.
     * @param element - The selector of the element to retrieve the text content from.
     */

    public async getTextContent(element: string) {
        return await this.page.locator(element).textContent();
    }

    /**
     * Generates a date string for a specified day relative to the current date.
     * @param {number} [extraDay=0] - The number of additional days to add to the current date.
     * @returns {string} - A date string in the format "MM/DD/YYYY" representing the specified day.
     */

    public getDate(extraDay: number = 0): string {
        const currentDate = new Date();
        const tomorrowDate = new Date(currentDate);
        tomorrowDate.setDate(currentDate.getDate() + extraDay);
        const month = (tomorrowDate.getMonth() + 1).toString().padStart(2, '0');
        const day = tomorrowDate.getDate().toString().padStart(2, '0');
        const year = tomorrowDate.getFullYear().toString();
        return `${month}/${day}/${year}`;
    }

     public formatDateWithoutLeadingZero(dateString: string) {
        let parsedDate = new Date(dateString);
        return parsedDate.toLocaleDateString('en-US', {
            month: 'numeric',
            day: '2-digit',
            year: 'numeric'
        });
    }

}