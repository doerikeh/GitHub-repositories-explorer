"use client";
import SearchForm from "@/components/SearchForm";
import Success from "@/components/Success";
import UserList from "@/components/UserList";
import { GithubContext } from "@/context/GithubContext";
import { useContext } from "react";

export default function Home() {
  const { success, repoLoading } = useContext(GithubContext);

  return (
    <main className="container mx-auto p-4 my-16">
      <h1 className="text-3xl font-bold text-center mb-6">
        GitHub Repositories Explorer
      </h1>
      {success && <Success />}
      {repoLoading && <Success />}

      <SearchForm />
      <UserList />
    </main>
  );
}
