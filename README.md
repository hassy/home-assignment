## TypeScript Playwright Assignment

This project is a TypeScript assignment that focuses on utilizing Playwright for end-to-end testing, specifically targeting various scenarios. The codebase employs the Page Object Model methodology for improved organization and maintainability.

In addition, it includes a dedicated section for performance testing using [Artillery.io](https://artillery.io). This section showcases performance tests for both APIs and Playwright tests integrated with Artillery.

### Usage

1. **Clone the repository**
   
   ```bash
   git clone <repo_url>
   ```

2. **Install dependencies**
   
   ```bash
   npm ci
   ```

3. **Install Playwright browsers**
   
   ```bash
   npx playwright install
   ```

4. **Install Artillery**
   
   ```bash
   npm install -g artillery
   ```

5. **Execute Playwright tests**
   
   Navigate to the root folder and run:
   
   ```bash
   npx playwright test
   ```

6. **Run API Performance Tests with Artillery**
   
   Execute the following command from the API Performance Test folder:
   
   ```bash
   artillery run airbnb-api-perf-test.yml
   ```

7. **Run Playwright Test Performance Tests with Artillery**
   
   Execute the following command from the Playwright Test Performance Test folder:
   
   ```bash
   artillery run airbnb-playwright-perf-test.yml
   ```
