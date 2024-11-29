import React, { createContext, useEffect, useState } from "react";
import { apiUrl } from "../utils/apiUrl";

const UserStatusContext = createContext();
const UserStatusProvider = ({ children }) => {
  const [userStatus, setUserStatus] = useState(
    document.cookie.includes("token")
  );
  const [role, setRole] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(`${apiUrl}/user/auth/status`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
          return setUserStatus(false);
        }
        setUserStatus(true);
        setRole(data.role);
      } catch (error) {}
    };
    fetchApi();
  }, []);
  return (
    <UserStatusContext.Provider
      value={{ userStatus, setUserStatus, role, setRole }}
    >
      {children}
    </UserStatusContext.Provider>
  );
};
export { UserStatusProvider, UserStatusContext };
