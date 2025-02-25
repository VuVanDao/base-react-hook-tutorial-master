import React, { useState } from "react";
const UserContext = React.createContext();
const UserProvider = ({ children }) => {
  let [name, setName] = useState({
    isAuthenticated: false,
    token: "",
    account: {},
    username: "",
  });
  const loginContext = (userData) => {
    setName(userData);
  };
  return (
    <UserContext.Provider value={{ name, loginContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
