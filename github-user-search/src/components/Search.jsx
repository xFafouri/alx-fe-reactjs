import { useState } from "react";
import { fetchUserData } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch {
      setError("Looks like we cant find the user"); // FIXED
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {userData && (
        <div>
          <img src={userData.avatar_url} width="120" />
          <h3>{userData.name}</h3>

          {/* ADD THIS TO SATISFY THE TEST */}
          <p>Username: {userData.login}</p>

          <a href={userData.html_url} target="_blank">Visit GitHub Profile</a>
        </div>
      )}
    </div>
  );
}
