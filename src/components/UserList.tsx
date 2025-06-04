"use client";

import { GithubContext } from "@/context/GithubContext";
import { KeyboardEvent, useContext, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import RepositoryList from "./RepositoryList";

import Collapse from "./Collapse";

export default function UserList() {
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);
  const { users, loading, error, selectUser } =
    useContext(GithubContext);

  const toggleUser = (userId: number, username: string) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
    selectUser(username);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    userId: number,
    username: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleUser(userId, username);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-center">
        <ErrorMessage message={error} />
      </div>
    );
  console.log(users);
  return (
    <div className="mb-6">
      {users.length === 0 && <p className="text-center">No users found.</p>}
      <div>
        {users.slice(0, 5).map((user) => {
          const isExpanded = expandedUserId === user.id;
          return (
            <Collapse
              key={user.id}
              id={user.id}
              avatarUrl={user.avatar_url}
              loginGit={user.login}
              isExpanded={isExpanded}
              tabIndex={0}
              toggleUser={(e: { stopPropagation: () => void }) => {
                e.stopPropagation(); // Prevent triggering selectUser when toggling collapse
                toggleUser(user.id, user.login);
              }}
              handleKeyDown={async (e: KeyboardEvent<HTMLDivElement>) =>
                handleKeyDown(e, user.id, user.login)
              }
            >
              {isExpanded && (
                <div>
                  <RepositoryList />
                </div>
              )}
            </Collapse>
          );
        })}
      </div>
    </div>
  );
}
