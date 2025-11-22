import { useEffect, useState } from "react";
import { getUser } from "../services/githubService";

export default function Profile({ username }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(username).then(setUser);
  }, [username]);

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}
