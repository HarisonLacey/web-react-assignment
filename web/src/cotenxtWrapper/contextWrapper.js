import { createContext, useContext } from "react";

// context wrapper for components
const NewContext = createContext();

export function ContextWrapper({ children, data }) {
  return (
    <NewContext.Provider value={{ con: data }}>{children}</NewContext.Provider>
  );
}

// function to use context data
export function useContextWrapper() {
  return useContext(NewContext);
}
