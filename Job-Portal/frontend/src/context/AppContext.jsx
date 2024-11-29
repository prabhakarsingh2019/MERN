import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const Components = {
    DEFAULT: "",
    LOGIN: "login",
    SIGNUP: "signup",
    FORGET_PASSWORD: "forgetPassword",
  };
  const [component, setComponent] = useState(Components.DEFAULT);
  return (
    <AppContext.Provider value={{ Components, component, setComponent }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
