const BASE_URL = "https://api.github.com";

export async function getUser(username) {
  const token = import.meta.env.VITE_GITHUB_API_TOKEN;

  const res = await fetch(`${BASE_URL}/users/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
