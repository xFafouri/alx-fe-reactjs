import axios from "axios";

export async function advancedUserSearch({ username, location, minRepos, page }) {
  const token = import.meta.env.VITE_GITHUB_API_TOKEN;

  let query = "";

  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos} `;

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(
    query
  )}&page=${page}&per_page=10`;

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return {
    users: response.data.items,
    total: response.data.total_count,
  };
}
