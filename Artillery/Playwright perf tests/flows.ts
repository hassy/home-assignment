import { Page } from "playwright";
import { expect } from "@playwright/test";

export async function helloFlow(page: Page) {
    await page.goto("https://www.artillery.io/");
    await expect(page.getByText("Never Fail To Scale")).toBeVisible();
}