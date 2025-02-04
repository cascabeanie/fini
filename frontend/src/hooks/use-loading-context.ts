import { createContext, useContext } from "react";

type LoadingContextType = {
  loadingStatus: boolean;
  setLoadingStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoadingContext = createContext<LoadingContextType | null>(null);

export function useLoadingContext() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error(
      "LoadingContext must be used within a LoadingContextProvider",
    );
  }
  return context;
}
