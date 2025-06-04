"use client";

import { fetchUserRepos, fetchUsers } from "@/services/githubApi";
import { GithubContextType, GithubUser, Repository } from "@/types";
import { createContext, useState, ReactNode } from "react";

export const GithubContext = createContext<GithubContextType>({
  users: [],
  repositories: [],
  loading: false,
  repoLoading: false,
  success: false,
  repoSuccess: false,
  error: null,
  repoError: null,
  selectedUser: null,
  searchUsers: async () => {},
  selectUser: async () => {},
});

export function GithubProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [repoLoading, setRepoLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [repoSuccess, setRepoSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [repoError, setRepoError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const showTimedToast = (duration = 1000) => {
    setSuccess(true);
    setRepoSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setRepoSuccess(false);
    }, duration);
  };

  const searchUsers = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const users = await fetchUsers(query);
      if (users.length === 0) {
        throw new Error("User not found");
      }
      showTimedToast();
      setLoading(true);
      setUsers(users);
    } catch {
      setError("User not Found. Please try again.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const selectUser = async (username: string) => {
    setSelectedUser(username);
    setRepoLoading(true);
    setRepoError(null);
    try {
      const repos = await fetchUserRepos(username);
      showTimedToast();
      setRepoLoading(true);
      setRepositories(repos);
    } catch {
      setRepoError("Failed to fetch repositories. Please try again.");
      setRepositories([]);
    } finally {
      setRepoLoading(false);
    }
  };

  return (
    <GithubContext.Provider
      value={{
        users,
        repositories,
        loading,
        repoLoading,
        error,
        success,
        repoSuccess,
        repoError,
        selectedUser,
        searchUsers,
        selectUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
}
