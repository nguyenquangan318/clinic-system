import { createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children, currentUser }) => {
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
