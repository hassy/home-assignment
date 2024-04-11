```markdown

## Description
This project is a TypeScript assignment focusing on using Playwright for end-to-end testing, specifically targeting various scenarios. The codebase is structured using the Page Object Model methodology for better organization and maintainability.

Additionally, it includes a section dedicated to performance testing using [Artillery.io](https://artillery.io). This section demonstrates performance tests for both APIs and Playwright tests integrated with Artillery.

## Installation
To get started, ensure you have the latest version of Node.js installed. You can download and install it from the [official Node.js website](https://nodejs.org/).

Next, install Artillery and Playwright globally by running the following commands:

npm install -D @playwright/test@latest

# Also download new browser binaries and their dependencies:
npx playwright install --with-deps

npm install -g artillery
```

Then, clone the repository to your local machine:
```bash
git clone https://github.com/Mshumaman/home-assignment.git

cd home-assignment.git
```

Install the project dependencies:
```bash
npm install
```

## Usage
Describe how to use your project. Include any necessary setup steps, configuration, or environment variables.

## Testing
The project utilizes Playwright for end-to-end testing. To run the tests, use the following command:
```bash
npx playwright test
```

## Performance Testing
### Artillery.io Integration
This project includes performance testing using Artillery.io. There are two types of performance tests showcased:
1. **API Performance Test**: This test evaluates the performance of the API endpoints.
   To run the API performance test, use:
   ```bash
   artillery run airbnb-api-perf-test.yml
   ```

2. **Playwright Test Performance Test**: This test evaluates the performance of Playwright tests.
   To run the Playwright test performance test, use:
   ```bash
   artillery run airbnb-playwright-perf-test.yml
   ```
