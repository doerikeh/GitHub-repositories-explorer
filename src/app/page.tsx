import SearchForm from "@/components/SearchForm";
import UserList from "@/components/UserList";



export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">GitHub Repositories Explorer</h1>
      <SearchForm />
      <UserList />
    </main>
  );
}