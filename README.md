# 🎭 Playwright Test Automation Framework

A comprehensive, production-ready test automation framework built with Playwright, TypeScript, and modern best practices. This portfolio project demonstrates advanced automation techniques including Page Object Model (POM), API testing, parallel execution, sharding, and CI/CD integration.

## ✨ Features

### 🎯 Core Capabilities
- **Page Object Model (POM)**: Clean, maintainable test architecture with reusable page objects
- **Custom Fixtures**: Extensible fixture system for dependency injection and test setup
- **Multi-Environment Support**: Environment-based configuration for flexible test execution
- **Parallel Execution**: Tests run in parallel across multiple browsers for faster feedback
- **Test Sharding**: Distribute tests across multiple workers for optimal performance
- **Comprehensive Reporting**: Allure reports with detailed test execution insights and Playwright HTML reports

### 🧪 Test Coverage
- **UI Testing**: End-to-end tests for web applications including login flows, secure area navigation, and interactive elements
- **API Testing**: RESTful API testing with reusable API clients
- **Cross-Browser Testing**: Tests executed on Chromium, Firefox, and WebKit
- **Error Handling**: Robust error handling with automatic retries and detailed failure diagnostics

### 🚀 CI/CD Integration
- **GitHub Actions**: Automated test execution on push, pull requests, and scheduled runs
- **Sharding Strategy**: Parallel test execution across multiple shards for faster CI pipelines
- **Artifact Management**: Automatic upload of test reports and artifacts
- **Secret Management**: Secure credential handling via GitHub Secrets

## 📁 Project Structure

```
Playwright/
├── tests/
│   ├── api/              # API test specifications
│   │   └── users.spec.ts
│   ├── ui/               # UI test specifications
│   │   ├── login.spec.ts
│   │   ├── secure-area.spec.ts
│   │   └── todo.spec.ts
│   ├── pages/            # Page Object Models
│   │   ├── base.page.ts
│   │   ├── login.page.ts
│   │   ├── secure-area.page.ts
│   │   └── todo.page.ts
│   └── support/          # Test utilities and fixtures
│       ├── fixtures.ts
│       ├── config.ts     # Configuration helper (env vars)
│       └── apiClient.ts
├── .github/
│   └── workflows/
│       └── playwright.yml
├── playwright.config.ts  # Playwright configuration
├── package.json
└── README.md
```

## 🚦 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Playwright
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (Optional)
   
   Create a `.env` file in the project root:
   ```env
   BASE_URL=https://the-internet.herokuapp.com
   BASE_URL_TODO=https://demo.playwright.dev/todomvc
   BASE_URL_API=https://dummyjson.com
   LOGIN_USER=*********
   LOGIN_PASS=************
   ```
   
   > **Note**: All environment variables have default values, so this step is optional for local development.

4. **Install Playwright browsers**
   ```bash
   npx playwright install --with-deps
   ```

## 🧪 Running Tests

### Basic Test Execution

```bash
# Run all tests
npm test

# Run UI tests only
npm run test:ui

# Run API tests only
npm run test:api

# Run tests in headed mode (visible browser)
npm run test:ui:headed

# Run tests and open HTML report
npm run test:ui:headed:open
```

### Test Sharding

Sharding allows you to split tests across multiple workers for faster execution:

```bash
# Run tests with 2 shards (shard 1 of 2)
npm run test:shard:2

# Run tests with 3 shards (shard 1 of 3)
npm run test:shard:3

# Run tests with 4 shards (shard 1 of 4)
npm run test:shard:4

# Custom sharding using Playwright directly (e.g., shard 2 of 4)
npx playwright test --shard=2/4

# Run specific shard from command line
npx playwright test --shard=1/3  # First shard of 3
npx playwright test --shard=2/3  # Second shard of 3
npx playwright test --shard=3/3  # Third shard of 3
```

### CI Mode

```bash
# Run tests in CI mode with all reporters
npm run test:ci
```

## 📊 Reporting

### Allure Reports

```bash
# Generate Allure report
npm run allure:generate

# Open Allure report in browser
npm run allure:open

# Run tests, generate and open Allure report (one command)
npm run test:allure:open
```

### Playwright HTML Reports

```bash
# Open the latest Playwright HTML report
npm run report:playwright
```

### Clean Reports

```bash
# Remove all test artifacts and reports
npm run clean:reports
```

## 🔧 Configuration

### Quick Overview

All configuration is managed through environment variables with sensible defaults. Configuration is centralized in `tests/support/config.ts`.

**Configuration Priority:**
1. Environment variables (`.env` file or system env vars) - **Highest Priority**
2. Default values (defined in `config.ts`) - **Fallback**

**Available Variables:**
- `BASE_URL` - Base URL for The Internet application
- `BASE_URL_TODO` - Base URL for TodoMVC application
- `BASE_URL_API` - Base URL for API endpoints
- `LOGIN_USER` - Username for authentication (⚠️ sensitive)
- `LOGIN_PASS` - Password for authentication (⚠️ sensitive)

📖 **For detailed configuration guide, see [CONFIG.md](./CONFIG.md)**

### Quick Setup

**Local Development:**
1. Create `.env` file in project root (see `.env.example`)
2. Or use system environment variables

**CI/CD (GitHub Actions):**
- Uses GitHub Secrets (optional - defaults work fine)
- See `.github/workflows/playwright.yml` for current setup

### Playwright Configuration

Key configuration options in `playwright.config.ts`:

- **Parallel Execution**: Tests run in parallel by default
- **Retries**: 2 retries in CI, 0 locally
- **Timeout**: 45 seconds per test
- **Browsers**: Chromium, Firefox, and WebKit
- **Reporting**: List, HTML, and Allure reporters
- **Tracing**: Enabled on first retry for debugging
- **Screenshots/Videos**: Captured on test failure

## 🤖 GitHub Actions CI/CD

### Workflow Features

- **Triggers**: 
  - Push to any branch
  - Pull requests
  - Scheduled daily runs (07:00 UTC)

- **Test Execution**:
  - Runs tests across 3 shards in parallel
  - Uses GitHub Secrets for credentials
  - Generates Allure and HTML reports

- **Artifacts**:
  - Playwright HTML reports (per shard)
  - Allure reports (per shard)
  - Merged Allure report (consolidated)

### Setting Up GitHub Secrets (Optional)

The workflow uses default values, but you can override them with GitHub Secrets:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add secrets (all optional - defaults are used if not set):
   - `BASE_URL`, `BASE_URL_TODO`, `BASE_URL_API`
   - `LOGIN_USER`, `LOGIN_PASS`

> **Note**: Secrets are optional. Default values from `tests/support/config.ts` are used if secrets are not set.

## 📝 Test Examples

### UI Test Example

```typescript
test('should login successfully with valid credentials', async ({ loginPage, secureAreaPage }) => {
  await loginPage.goto();
  await loginPage.login(username, password);
  await secureAreaPage.assertLoginSuccess();
});
```

### API Test Example

```typescript
test('should list users successfully', async ({ apiClient }) => {
  const response = await apiClient.listUsers();
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body.users)).toBeTruthy();
});
```

## 🏗️ Architecture

### Page Object Model (POM)

Each page has its own Page Object class that encapsulates:
- Page elements (locators)
- Page actions (methods)
- Page assertions (validation methods)

**Benefits**:
- Reusability across tests
- Maintainability when UI changes
- Clear separation of concerns
- Easy to extend and modify

### Custom Fixtures

Fixtures provide dependency injection for tests:
- `loginPage`: LoginPage instance
- `secureAreaPage`: SecureAreaPage instance
- `todoPage`: TodoPage instance
- `apiClient`: API client instance

**Benefits**:
- Consistent test setup
- Reduced boilerplate code
- Easy to mock or extend
- Better test isolation

## 🎓 Best Practices Implemented

1. **Environment-Based Configuration**: All URLs and credentials are configurable via environment variables
2. **Test Isolation**: Each test is independent and can run in any order
3. **Explicit Waits**: All actions use Playwright's auto-waiting mechanism
4. **Error Handling**: Comprehensive error messages and failure diagnostics
5. **Code Documentation**: Well-documented code with JSDoc comments
6. **Type Safety**: Full TypeScript support with strict mode
7. **CI/CD Ready**: Optimized for continuous integration with sharding and reporting

## 🔒 Security

- `.env` files are gitignored to prevent credential exposure
- GitHub Secrets are used for sensitive data in CI/CD
- No hardcoded credentials in source code
- Environment variables with secure defaults

## 📈 Performance

- **Parallel Execution**: Tests run simultaneously across multiple workers
- **Test Sharding**: Tests distributed across shards for optimal performance
- **Selective Execution**: Run specific test suites or files
- **Efficient Selectors**: Optimized locators for fast element identification

## 🛠️ Technologies

- **Playwright**: Modern end-to-end testing framework
- **TypeScript**: Type-safe development
- **Allure**: Comprehensive test reporting
- **GitHub Actions**: CI/CD automation
- **dotenv**: Environment variable management

## 📄 License

ISC

## 👤 Author

**Ahmet Demir**

---

## 🙏 Acknowledgments

- Test applications: [The Internet](https://the-internet.herokuapp.com), [TodoMVC](https://demo.playwright.dev/todomvc), [DummyJSON API](https://dummyjson.com)
- Playwright team for the excellent testing framework
- Allure reporting community

