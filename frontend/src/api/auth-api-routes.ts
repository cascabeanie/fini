import { userType } from "../lib/types/user-types";

const baseUrl = import.meta.env.VITE_BASE_URL;

// register a new user
export async function registerUser(newUser: userType) {
  const { username, password } = newUser;

  try {
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

    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      // Handle non-200 responses by returning error message to be handled in Register component
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

// Login an existing user
