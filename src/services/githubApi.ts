import { GithubUser, Repository } from "@/types";

const API_URL = process.env.GITHUB_API_URL ||'https://api.github.com' 

export async function fetchUsers(query: string): Promise<GithubUser[]> {
   const encodedQuery = encodeURIComponent(query);
  const response = await fetch(`${API_URL}/search/users?q=${encodedQuery}`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  const data = await response.json();
  return data.items;
}

export async function fetchUserRepos(username: string): Promise<Repository[]> {
  const encodedUsername = encodeURIComponent(username);
  const response = await fetch(`${API_URL}/users/${encodedUsername}/repos`);
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }
  return response.json();
}