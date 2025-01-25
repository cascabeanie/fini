import { userType } from "../lib/types/user-types";

const baseUrl = import.meta.env.VITE_BASE_URL;

// register a new user
export async function registerUser(newUser: userType) {
  const { username, password } = newUser;

  const res = await fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    return errorData;
  }

  const data = await res.json();
  return data;
}

// Login an existing user
export async function loginUser(existingUser: userType) {
  const { username, password } = existingUser;

  const res = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    return errorData;
  }

  const data = await res.json();
  return data;
}

// Logout an existing user?
