import { useState } from "react";
import { advancedUserSearch } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const { users, total } = await advancedUserSearch({
        username,
        location,
        minRepos,
        page: 1,
      });

      setResults(users);
      setTotalCount(total);
      setPage(1);
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);

    try {
      const { users } = await advancedUserSearch({
        username,
        location,
        minRepos,
        page: nextPage,
      });

      setResults((prev) => [...prev, ...users]);
      setPage(nextPage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form
        onSubmit={handleSearch}
        className="bg-white shadow-lg rounded-xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Advanced Search</h2>

        <input
          type="text"
          value={username}
          placeholder="Username (optional)"
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />

        <input
          type="text"
          value={location}
          placeholder="Location (optional)"
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />

        <input
          type="number"
          value={minRepos}
          placeholder="Minimum repositories (optional)"
          onChange={(e) => setMinRepos(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 mt-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* STATUS */}
      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      {/* RESULTS */}
      <div className="mt-6 space-y-4">
        {results.map((u) => (
          <div
            key={u.id}
            className="flex items-center bg-white shadow p-4 rounded-lg"
          >
            <img
              src={u.avatar_url}
              className="w-16 h-16 rounded-full mr-4"
              alt="avatar"
            />
            <div>
              <h3 className="font-bold text-lg">{u.login}</h3>
              <p>Score: {u.score.toFixed(2)}</p>
              <a
                className="text-blue-600 underline"
                href={u.html_url}
                target="_blank"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}

        {results.length > 0 && results.length < totalCount && (
          <button
            onClick={loadMore}
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:
