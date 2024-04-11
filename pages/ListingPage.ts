import {expect} from "@playwright/test";
import AirbnbMainPage from "./AirbnbMainPage";

export default class ListingPage extends AirbnbMainPage {
    private checkinDate = '[data-testid="change-dates-checkIn"]';
    private checkinOut = '[data-testid="change-dates-checkOut"]';
    private guests = '[data-testid="book-it-default"] ._j1kt73';
    private closeTranslationPopup = '[class*="k_1tcgj5g dir dir-ltr"]';
    private guestDropdown = '[for="GuestPicker-book_it-trigger"]';
    private childCounter = "GuestPicker-book_it-form-children-stepper-value";
    private childDecreaseButton = '[data-testid="GuestPicker-book_it-form-children-stepper-decrease-button"]';
    private reserveButton = '[data-plugin-in-point-id="BOOK_IT_SIDEBAR"] [data-testid="homes-pdp-cta-btn"]';

    /**
     * This function locates and clicks on the close button of a popup window
     */

    public async closePopup() {
        let closePopup = this.page.locator(this.closeTranslationPopup);
        await closePopup.click();
    }

    /**
     * Validates the check-in date displayed on the page.
     * @param checkinDate - The expected check-in date to validate against.
     */

    public async validateCheckinDate(checkinDate: string) {
        await this.validateTextContent(this.checkinDate, checkinDate);
    }

    /**
     * Validates the checkout date displayed on the page
     * @param checkinDate - The expected checkout date to validate against.
     */

    public async validateCheckoutDate(checkinDate: string) {
        await this.validateTextContent(this.checkinOut, checkinDate);
    }

    /**
     * Validates the number of guests displayed on the page.
     * @param expectedNumberOfGuests - The expected number of guests to validate against.
     */

    public async validateNumberOfGuests(expectedNumberOfGuests: number) {
        const numberOfGuests = parseInt(await this.getTextContent(this.guests));
        expect(numberOfGuests).toEqual(expectedNumberOfGuests);
    }

    /**
     * Decreases the number of child guests to zero by clicking the decrease button.
     */

    public async decreaseChildGuestToZero() {
        await this.page.locator(this.guestDropdown).click();
        let guestCount = parseInt(await this.page.getByTestId(this.childCounter).textContent());
        for (let i = 0; i < guestCount; i++) {
            await this.page.locator(this.childDecreaseButton).click();
            if (guestCount === 0) {
                break;
            }
        }
    }

    /**
     * Changes the booking dates based on the specified offsets from today's date.
     * @param checkinOffset - The offset in days from today's date for the check-in date.
     * @param checkoutOffset - The offset in days from today's date for the checkout date.
     */

    public async changeBookingDates(checkinOffset: number, checkoutOffset: number) {
        let nextWeekDate = this.getDate(checkinOffset);
        let nextWeekDatePlusOne = this.getDate(checkoutOffset);

        const isDateAvailableAttribute = 'data-is-day-blocked';
        const nextWeekDateSwap = this.calendarDate.replace('date', nextWeekDate);
        const nextWeekDatePlusOneSwap = this.calendarDate.replace('date', nextWeekDatePlusOne);

        let isFirstDateBlocked = await this.page.getByTestId(nextWeekDateSwap).getAttribute(isDateAvailableAttribute);
        let isSecondDateBlocked = await this.page.getByTestId(nextWeekDatePlusOneSwap).getAttribute(isDateAvailableAttribute);

        if (isFirstDateBlocked === "true" || isSecondDateBlocked === "true") {
            console.log("Booking for next week isn't available");
        } else {
            // select check-in date
            await this.selectDate(nextWeekDate);
            // select check-out date
            await this.selectDate(nextWeekDatePlusOne);
            // Format dates for validation
            const formattedCheckInDate = this.formatDateWithoutLeadingZero(nextWeekDate);
            const formattedCheckOutDate = this.formatDateWithoutLeadingZero(nextWeekDatePlusOne);
            // Validate new dates selected and displayed
            await this.validateCheckinDate(formattedCheckInDate);
            await this.validateCheckoutDate(formattedCheckOutDate);
        }
    }

    /**
     * Clicks the reserve button to proceed with the booking.
     */

    public async clickReserve() {
        await this.page.locator(this.reserveButton).click();
    }
}