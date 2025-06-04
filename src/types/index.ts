export interface GithubUser {
  id: number;
  login: string;
  avatar_url: string;
}

export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count:number
}

export interface GithubContextType {
  users: GithubUser[];
  repositories: Repository[];
  loading: boolean;
  repoLoading: boolean;
  error: string | null;
  repoError: string | null;
  selectedUser: string | null;
  searchUsers: (query: string) => Promise<void>;
  selectUser: (username: string) => Promise<void>;
}