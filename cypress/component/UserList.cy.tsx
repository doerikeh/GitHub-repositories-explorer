/* eslint-disable @typescript-eslint/no-explicit-any */
import { mount } from 'cypress/react'
import UserList from '@/components/UserList';
import { GithubContext } from '@/context/GithubContext';

describe('UserList', () => {
  let mockContext: any;

  beforeEach(() => {
    mockContext = {
      users: [{ id: 1, login: 'user1', avatar_url: 'https://avatar.url' }],
      repositories: [],
      loading: false,
      repoLoading: false,
      error: null,
      repoError: null,
      selectedUser: null,
      searchUsers: cy.stub(),
      selectUser: cy.stub(),
      resetSearch: cy.stub(),
    };
  });

  it('renders user list', () => {
    mount(
      <GithubContext.Provider value={mockContext}>
        <UserList />
      </GithubContext.Provider>
    );

    cy.contains('user1').should('be.visible');
  });
});