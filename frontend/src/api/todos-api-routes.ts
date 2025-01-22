const baseUrl = import.meta.env.VITE_BASE_URL;

export async function readTodos() {
  try {
    // dev: user_id will be provided in a jwt when implemented later
    const res = await fetch(`${baseUrl}todos`, {
      method: "GET",
      headers: {
        "user-id": "1",
      },
    });
    const data = await res.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
