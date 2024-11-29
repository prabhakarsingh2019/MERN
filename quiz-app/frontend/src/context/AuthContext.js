import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [appLoader, setAppLoader] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(
    document.cookie.includes("token")
  );
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(
          "https://quiz-app-backend-5k5j.onrender.com/api/auth/user",
          {
            credentials: "include",
          }
        );

        const data = await response.json();
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setAppLoader(false);
      }
    };

    checkAuthStatus();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        appLoader,
        setAppLoader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContextProvider, AuthContext };
