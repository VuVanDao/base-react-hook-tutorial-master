import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../Navigation/Nav";

const HomePage = () => {
  let history = useHistory();
  let [account, setAccount] = useState({});
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session));
    } else {
      history.push("/login");
    }
  }, []);
  return (
    <div>
      {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />}
      <div>HomePage</div>
    </div>
  );
};

export default HomePage;
