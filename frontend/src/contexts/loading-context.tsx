import { createContext, useContext, useState } from "react";

type LoadingContextProviderProps = {
  children: React.ReactNode;
};

type LoadingContextType = {
  loadingStatus: boolean;
  setLoadingStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoadingContext = createContext<LoadingContextType | null>(null);

export default function LoadingContextProvider({
  children,
}: LoadingContextProviderProps) {
  const [loadingStatus, setLoadingStatus] = useState(false);

  return (
    <>
      <LoadingContext.Provider value={{ loadingStatus, setLoadingStatus }}>
        {children}
      </LoadingContext.Provider>
    </>
  );
}

export function useLoadingContext() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error(
      "LoadingContext must be used within a LoadingContextProvider",
    );
  }
  return context;
}
