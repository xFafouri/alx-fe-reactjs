import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { getUser } from "../services/githubService";
import { fetchUserData } from "../services/githubService.js";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getUser(username);
        setUser(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) return <p className="text-center mt-4 font-semibold">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;
  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-32 h-32 rounded-full mb-4"
        />
        <h1 className="text-2xl font-bold">{user.name || user.login}</h1>
        <p className="text-gray-600">@{user.login}</p>
        {user.location && <p className="mt-2">Location: {user.location}</p>}
        <p className="mt-2">Public Repos: {user.public_repos}</p>
        <a
          href={user.html_url}
          target="_blank"
          className="mt-4 text-blue-600 underline"
        >
          View GitHub Profile
        </a>
      </div>
    </div>
  );
}
