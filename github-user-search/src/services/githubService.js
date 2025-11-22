import axios from "axios";

const BASE_URL = "https://api.github.com/users/";

export async function fetchUserData(username) {
  const token = import.meta.env.VITE_GITHUB_API_TOKEN;

  const response = await axios.get(`${BASE_URL}${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
