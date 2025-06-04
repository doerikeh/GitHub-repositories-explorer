/* eslint-disable @typescript-eslint/no-explicit-any */
import { mount } from 'cypress/react'
import SearchForm from '@/components/SearchForm';
import { GithubContext } from '@/context/GithubContext';

describe('SearchForm', () => {
  let mockContext: any; // Use 'any' to avoid TypeScript issues for now

  beforeEach(() => {
    mockContext = {
      users: [],
      repositories: [],
      loading: false,
      repoLoading: false,
      error: null,
      repoError: null,
      selectedUser: null,
      searchUsers: cy.stub().as('searchUsers'),
      selectUser: cy.stub(),
      resetSearch: cy.stub(),
    };
  });

  it('renders input and search button', () => {
    mount(
      <GithubContext.Provider value={mockContext}>
        <SearchForm />
      </GithubContext.Provider>
    );

    cy.get('input[placeholder="Search GitHub users..."]').should('be.visible');
    cy.get('button').contains(/search/i).should('be.visible');
  });

  it('calls searchUsers on button click', () => {
    mount(
      <GithubContext.Provider value={mockContext}>
        <SearchForm />
      </GithubContext.Provider>
    );

    cy.get('input[placeholder="Search GitHub users..."]').type('test');
    cy.get('button').contains(/search/i).click();

    cy.get('@searchUsers').should('have.been.calledWith', 'test');
  });
});