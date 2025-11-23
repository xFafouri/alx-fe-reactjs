import axios from "axios";

const token = import.meta.env.VITE_GITHUB_API_TOKEN;

// Advanced search: username + location + minRepos
export async function fetchUserData(username, location, minRepos) {
  let query = "";

  if (username) query += `${username}+in:login`;
  if (location) query += `+location:${location}`;
  if (minRepos) query += `+repos:>=${minRepos}`;

  const url = `https://api.github.com/search/users?q=${query}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

// Fetch single GitHub user by username
export async function getUser(username) {
  const url = `https://api.github.com/users/${username}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
