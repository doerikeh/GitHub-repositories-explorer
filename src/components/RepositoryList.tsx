"use client";

import { GithubContext } from "@/context/GithubContext";
import { useContext } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import StarIcon from "@/icon/Star";

export default function RepositoryList() {
  const { repositories, repoLoading, repoError, selectedUser } =
    useContext(GithubContext);

  if (!selectedUser) return null;
  if (repoLoading) return <LoadingSpinner />;
  if (repoError) return <ErrorMessage message={repoError} />;

  return (
    <div>
      <h2 className="text-xl md:text-3xl font-semibold mb-4">
        Repositories for {selectedUser}
      </h2>
      {repositories.length === 0 && <p>No repositories found.</p>}
      <ul className="grid gap-4">
        {repositories.map((repo) => (
          <li
            key={repo.id}
            className="p-4 bg-white rounded-lg shadow grid grid-cols-1 gap-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="max-w-2/3 lg:max-w-full">
                <h3 className="font-semibold text-lg md:text-2xl mb-2">
                  {repo.name}
                </h3>

                <p className="text-gray-600 text-base lg:text-lg">
                  {repo.description || "No description"}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-600 text-base lg:text-lg">
                  {repo.stargazers_count}
                </p>
                <StarIcon />
              </div>
            </div>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View on GitHub
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
