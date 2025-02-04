import { useState } from "react";
import { AuthContext } from "../hooks/use-auth-context";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [authStatus, setAuthStatus] = useState(false);

  return (
    <>
      <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
