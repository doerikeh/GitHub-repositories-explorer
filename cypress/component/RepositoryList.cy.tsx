/* eslint-disable @typescript-eslint/no-explicit-any */
import { mount } from 'cypress/react'
import RepositoryList from '@/components/RepositoryList';
import { GithubContext } from '@/context/GithubContext';

describe('RepositoryList', () => {
  let mockContext: any;

  beforeEach(() => {
    mockContext = {
      users: [],
      repositories: [{ id: 1, name: 'repo1', description: 'Test repo', html_url: 'https://github.com/repo1' }],
      loading: false,
      repoLoading: false,
      error: null,
      repoError: null,
      selectedUser: 'user1',
      searchUsers: cy.stub(),
      selectUser: cy.stub(),
      resetSearch: cy.stub(),
    };
  });

  it('renders repository list', () => {
    mount(
      <GithubContext.Provider value={mockContext}>
        <RepositoryList />
      </GithubContext.Provider>
    );

    cy.contains('repo1').should('be.visible');
  });
});