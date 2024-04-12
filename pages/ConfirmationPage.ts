import BasePage from "./BasePage";

export default class ConfirmationPage extends BasePage {

    public async validateReservationUrl(url: string) {
        await this.validateUrl(url);
    }
}