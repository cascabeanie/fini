import { useState } from "react";
import { LoadingContext } from "../hooks/use-loading-context";

type LoadingContextProviderProps = {
  children: React.ReactNode;
};

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
