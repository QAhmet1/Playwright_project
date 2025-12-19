/**
 * Test Configuration
 * 
 * Central configuration manager for the test framework.
 * 
 * Configuration Priority:
 * 1. Environment variables (process.env.*) - Highest priority
 *    - Set via .env file (local development)
 *    - Set via system environment variables
 *    - Set via CI/CD pipeline (GitHub Actions secrets/env vars)
 * 2. Default values (fallback for local development)
 * 
 * Environment Variables:
 * - BASE_URL: Base URL for The Internet application
 * - BASE_URL_TODO: Base URL for TodoMVC application  
 * - BASE_URL_API: Base URL for API endpoints
 * - LOGIN_USER: Username for authentication tests
 * - LOGIN_PASS: Password for authentication tests
 */

/**
 * Default configuration values
 * Used as fallback when environment variables are not set
 */
const DEFAULT_CONFIG = {
  urls: {
    base: 'https://the-internet.herokuapp.com',
    todo: 'https://demo.playwright.dev/todomvc',
    api: 'https://dummyjson.com',
  },
  credentials: {
    username: 'tomsmith',
    password: 'SuperSecretPassword!',
  },
} as const;

/**
 * Get environment variable with fallback to default value
 */
function getEnv(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}

/**
 * Application configuration
 * 
 * This object is exported and used throughout the test suite.
 * All configuration values come from environment variables with sensible defaults.
 * 
 * Usage:
 * ```typescript
 * import { config } from '../support/config';
 * 
 * const url = config.urls.base; // Uses BASE_URL env var or default
 * const username = config.credentials.username; // Uses LOGIN_USER env var or default
 * ```
 */
export const config = {
  /**
   * Base URLs for different applications
   * 
   * Set these via environment variables:
   * - BASE_URL: For The Internet application
   * - BASE_URL_TODO: For TodoMVC application
   * - BASE_URL_API: For API endpoints
   */
  urls: {
    base: getEnv('BASE_URL', DEFAULT_CONFIG.urls.base),
    todo: getEnv('BASE_URL_TODO', DEFAULT_CONFIG.urls.todo),
    api: getEnv('BASE_URL_API', DEFAULT_CONFIG.urls.api),
  },

  /**
   * Login credentials
   * 
   * Set these via environment variables:
   * - LOGIN_USER: Username for authentication
   * - LOGIN_PASS: Password for authentication
   * 
   * ⚠️ Security Note: Never commit actual credentials to version control.
   * Use environment variables or secrets in CI/CD.
   */
  credentials: {
    username: getEnv('LOGIN_USER', DEFAULT_CONFIG.credentials.username),
    password: getEnv('LOGIN_PASS', DEFAULT_CONFIG.credentials.password),
  },
} as const;

/**
 * Configuration metadata (for debugging/logging)
 */
export const configMeta = {
  /**
   * Check if a configuration value is using environment variable or default
   */
  isUsingEnvVar: (key: keyof typeof config.urls | keyof typeof config.credentials): boolean => {
    if (key === 'base') return !!process.env.BASE_URL;
    if (key === 'todo') return !!process.env.BASE_URL_TODO;
    if (key === 'api') return !!process.env.BASE_URL_API;
    if (key === 'username') return !!process.env.LOGIN_USER;
    if (key === 'password') return !!process.env.LOGIN_PASS;
    return false;
  },
  
  /**
   * Get all environment variables used in configuration
   */
  getEnvVars: () => ({
    BASE_URL: process.env.BASE_URL,
    BASE_URL_TODO: process.env.BASE_URL_TODO,
    BASE_URL_API: process.env.BASE_URL_API,
    LOGIN_USER: process.env.LOGIN_USER ? '***' : undefined, // Mask for security
    LOGIN_PASS: process.env.LOGIN_PASS ? '***' : undefined, // Mask for security
  }),
};
