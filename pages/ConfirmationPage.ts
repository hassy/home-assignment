import BasePage from "./BasePage";

export default class ConfirmationPage extends BasePage {

    /**
     * Validates that the current URL matches the provided reservation URL.
     * @param url - The reservation URL to validate against.
     */

    public async validateReservationUrl(url: string) {
        await this.validateUrl(url);
    }
}