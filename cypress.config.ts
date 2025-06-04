import { defineConfig } from 'cypress';

export default defineConfig({
 component: {
    
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    
    specPattern: 'cypress/component/**/*.cy.{ts,tsx}',
    supportFile: 'cypress/support/component.ts',
     indexHtmlFile: 'cypress/support/component-index.html',
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
  },
});