import { createContext, useState, useContext } from "react";

const QueryContext = createContext();

export const useQueryContext = () => useContext(QueryContext);

export const QueryContextProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const value = {
    query,
    setQuery,
  };
  return (
    <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
  );
};
