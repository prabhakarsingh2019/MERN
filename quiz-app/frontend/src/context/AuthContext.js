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
        const response = await fetch("/api/auth/user", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
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
