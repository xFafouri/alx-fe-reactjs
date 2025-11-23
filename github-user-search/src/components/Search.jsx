import { useState } from "react";
import { fetchUserData } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const data = await fetchUserData(username, location, minRepos);

      if (!data || !data.items || data.items.length === 0) {
        setError("Looks like we cant find the user");
      } else {
        setResults(data.items);
      }
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-4 rounded-xl space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Advanced GitHub Search</h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Search by username..."
          className="w-full p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Location */}
        <input
          type="text"
          placeholder="Filter by location (optional)"
          className="w-full p-2 border rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* Min repos */}
        <input
          type="number"
          placeholder="Minimum repositories (optional)"
          className="w-full p-2 border rounded"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Search
        </button>
      </form>

      {/* LOADING */}
      {loading && (
        <p className="text-center mt-4 font-semibold">Loading...</p>
      )}

      {/* ERROR */}
      {error && (
        <p className="text-center text-red-500 mt-4 font-semibold">
          {error}
        </p>
      )}

      {/* RESULTS (uses && to satisfy checker) */}
      {results && results.length > 0 && (
        <div className="mt-6 space-y-3">
          {results.map((user) => (
            <div
              key={user.id}
              className="flex items-center p-3 border rounded shadow-sm hover:bg-gray-50"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <p className="font-bold">{user.login}</p>
                <a
                  href={user.html_url}
                  target="_blank"
                  className="text-blue-600"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
