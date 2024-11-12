import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [activeOption, setActiveOption] = useState("quizzes");

  const token = localStorage.getItem("authToken");
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, activeOption, setActiveOption }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContextProvider, AuthContext };
