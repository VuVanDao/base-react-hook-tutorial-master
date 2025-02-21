import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Nav from "../Components/Navigation/Nav";
import _ from "lodash";

const PrivateRouters = (props) => {
  let history = useHistory();
  let [account, setAccount] = useState({});
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session));
    } else {
      history.push("/login");
    }
  }, [history]);
  return (
    <>
      {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />}
      <Route path={props.path} component={props.component} />
    </>
  );
};

export default PrivateRouters;
