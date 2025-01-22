import { useEffect } from "react";
import { readTodos } from "../api/todos-api-routes";

export default function Home() {
  useEffect(() => {
    readTodos();
  }, []);

  return <></>;
}
