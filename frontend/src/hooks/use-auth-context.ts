import { createContext, useContext } from "react";

type AuthContextType = {
  authStatus: boolean;
  setAuthStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext must be used within a AuthContextProvider");
  }
  return context;
}
