import { createContext, useContext } from "react";
import React from 'react';

// context wrapper for components
const NewContext = createContext();

export function ContextWrapper({ children, data }) {
  return (
    <NewContext.Provider value={data}>{children}</NewContext.Provider>
  );
}

// function to use context data
export function useContextWrapper() {
  return useContext(NewContext);
}
