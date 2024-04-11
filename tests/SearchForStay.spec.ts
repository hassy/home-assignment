import {expect, Page, test} from "@playwright/test";
import BasePage from "../pages/BasePage";
import AirbnbMainPage, {guestEnum} from "../pages/AirbnbMainPage";
import ListingPage from "../pages/ListingPage";
import ConfirmationPage from "../pages/ConfirmationPage";


test.describe('Search for a Stay exercise', () => {

    let basePage: BasePage;
    let airbnbPage: AirbnbMainPage;
    let listingPage: ListingPage;
    let confirmationPage: ConfirmationPage;
    let newTab: Page;
    const siteURL = 'https://www.airbnb.com/';
    const destination = 'Amsterdam, Netherlands';
    const numberOfAdults = 2;
    const numberOfChildren = 1;
    let tomorrowDate: string;
    let dayAfterTomorrowDate: string;
    let numberOfGuests: number;


    test('Search for a Stay in airbnb site and validate', async ({page}) => {

        basePage = new BasePage(page);
        airbnbPage = new AirbnbMainPage(page);
        listingPage = new ListingPage(page);

        await test.step('Navigate to airbnb', async () => {
            await basePage.loadApplication(siteURL);

        })
        await test.step(`Select ${destination} destination`, async () => {
            await airbnbPage.selectDestination(destination);
        })

        await test.step('Select tomorrow date as checkin and day after tomorrow for checkout', async () => {
            tomorrowDate = basePage.getDate(1);
            dayAfterTomorrowDate = basePage.getDate(2);
            await airbnbPage.selectDate(tomorrowDate);
            await airbnbPage.selectDate(dayAfterTomorrowDate);
        })

        await test.step('Select 2 adults and 1 child as number guests', async () => {
            await airbnbPage.selectGuests(guestEnum.ADULTS, numberOfAdults);
            await airbnbPage.selectGuests(guestEnum.CHILDREN, numberOfChildren);
        })

        await test.step('Search and validate results', async () => {
            await airbnbPage.clickSearch();
            await airbnbPage.validateSearchResults('places in Amsterdam');
        })
        await test.step('validate the number of guests', async () => {
            numberOfGuests = parseInt(await airbnbPage.getNumberOfGuests());
            expect(numberOfGuests).toEqual(3);
        })

        await test.step('Select the highest Rated listing', async () => {
            newTab = await airbnbPage.selectHighestRatedListing();
        })

        await test.step('Confirm Booking Details', async () => {
            listingPage = new ListingPage(newTab);
            const formattedCheckInDate = basePage.formatDateWithoutLeadingZero(tomorrowDate);
            const formattedCheckOutDate = basePage.formatDateWithoutLeadingZero(dayAfterTomorrowDate);
            await listingPage.closePopup();
            await listingPage.validateCheckinDate(formattedCheckInDate);
            await listingPage.validateCheckoutDate(formattedCheckOutDate);
            await listingPage.validateNumberOfGuests(numberOfGuests);

        })

        await test.step('Adjust and Verify Guest Count', async () => {
            await listingPage.decreaseChildGuestToZero();
            await listingPage.validateNumberOfGuests(numberOfGuests - 1);
        })

        await test.step('Change Booking Dates', async () => {
            await listingPage.changeBookingDates(8,9);
        })

        await test.step('Reserve and Validate', async () => {
            await listingPage.clickReserve();
            confirmationPage = new ConfirmationPage(newTab);
            await confirmationPage.validateReservationUrl('/book/stays/');
            await confirmationPage.validateReservationUrl(`numberOfAdults=${numberOfAdults}`);
        })
    })
});
