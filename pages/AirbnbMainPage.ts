import BasePage from "./BasePage";
import {expect, Locator} from "@playwright/test";

export enum guestEnum {
    ADULTS = 'adults',
    CHILDREN = 'children',
    INFANTS = 'infants',
    PETS = 'pets'
}

export default class AirbnbMainPage extends BasePage {
    private destinationText = 'structured-search-input-field-query';
    private destinationOptions = '[data-testid*="option-"]';
    protected calendarDate = 'calendar-day-date';
    private addGuestsField = '[data-testid*="guests-button"]';
    private guestPanel = 'structured-search-input-field-guests-panel';
    private search = "structured-search-input-search-button";
    private results = '.tyi4kqb';
    private listingRating = '[class="ru0q88m atm_cp_1ts48j8 dir dir-ltr"]';
    private guestsInSearchPanel = '[class$="ltr"][data-index="2"] .f16sug5q';


    /**
     * Selects a destination from a search destination field.
     * @param destination - The destination to select.
     */

    public async selectDestination(destination: string): Promise<void> {
        let destinationField = this.page.getByTestId(this.destinationText);
        await destinationField.waitFor();
        await destinationField.pressSequentially(destination, {delay: 80}); //Delay added to allow time for the results to appear in the drop-down
        await this.selectFromDropdown(this.destinationOptions, destination);
    }

    /**
     * Selects a date on the calendar if it is available.
     * @param date - The date to select in the format "MM/DD/YYYY".
     */

    public async selectDate(date: string) {
        const dateSwapTomorrow = this.calendarDate.replace('date', date)
        await this.page.getByTestId(dateSwapTomorrow).click();
    }

    /**
     * Selects the number of guests for a specified guest type.
     * @param {guestEnum} guestType - The type of guest (e.g., adults, children).
     * @param guestNumber - The number of guests to select.
     */

    public async selectGuests(guestType: guestEnum, guestNumber: number) {
        let guestPanelCount = await this.page.getByTestId(this.guestPanel).count() < 1;
        if (guestPanelCount) {
            await this.page.locator(this.addGuestsField).click();
        }
        let guestCount = parseInt(await this.page.locator(`[data-testid="stepper-${guestType}-value"]`).textContent());
        for (let i = 0; i < guestNumber; i++) {
            await this.page.locator(`[data-testid="stepper-${guestType}-increase-button"]`).click();
            if (guestCount === guestNumber) {
                break;
            }
        }
    }

    /**
     * Clicks the search button to initiate a search action.
     */

    public async clickSearch() {
        await this.page.getByTestId(this.search).click();
    }

    /**
     * Validates the search results to ensure they meet the expected criteria.
     * @param expectedResult - The expected result to validate against.
     */

    public async validateSearchResults(expectedResult: string) {
        await this.page.waitForLoadState('networkidle')

        // Validate that the number of results is greater than 0
        const numberOfResults = parseInt(await this.page.locator(this.results).textContent())
        console.log("Total number of results: " + numberOfResults)
        expect(numberOfResults).toBeGreaterThan(0)

        // Validate that the result's text is correct
        await this.validateTextContent(this.results, expectedResult)
    }

    /**
     * Retrieves the number of guests displayed in the search panel.
     */

    public async getNumberOfGuests() {
        return await this.getTextContent(this.guestsInSearchPanel);
    }

    /**
     * Selects the highest-rated listing from a list of listings.*
     * This function iterates through all the elements containing listing ratings on the page.
     * It compares the ratings of each listing to find the highest-rated one.
     * Once the highest-rated listing is identified, it clicks on it to open it in a new tab.
     */
    public async selectHighestRatedListing() {
        let highestRating = 0;
        let highestRatedElement: Locator;
        const ratingElements = await this.page.locator(this.listingRating).all();
        for (const element of ratingElements) {
            const ratingText = await element.innerText();
            const rating = parseFloat(ratingText);
            if (rating > highestRating) {
                highestRatedElement = element;
                highestRating = rating;
            }
        }
        // If a highest rated element is found, click on it to open the listing in a new tab
        if (highestRatedElement) {
            const [newTab] = await Promise.all([
                this.page.waitForEvent('popup'),
                await highestRatedElement.first().click({force: true})
            ]);
            return newTab;


        } else {
            console.log('No elements found with the specified class');
        }
    }
}
