import React, { useEffect, useState } from "react";
import { getUserAccount } from "../Services/userService";
const UserContext = React.createContext();
const UserProvider = ({ children }) => {
  let [name, setName] = useState({
    isAuthenticated: false,
    token: "",
    account: {},
    username: "",
  });

  useEffect(() => {
    console.log("nameContext", name);

    // handleGetUserAccount();
  }, []);
  const handleGetUserAccount = async () => {
    let result = await getUserAccount();
    let data = {
      isAuthenticated: true,
      token: data.access_token,
      account: { ...data.roles, ...result.data.email },
      username: result.data.username,
    };
    if (result.errCode === 0) {
      setName(result.data);
    }
  };
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
