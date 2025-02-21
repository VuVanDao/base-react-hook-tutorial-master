import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../Navigation/Nav";

const HomePage = () => {
  let history = useHistory();
  // let [account, setAccount] = useState({});
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      // setAccount(JSON.parse(session));
    } else {
      history.push("/login");
    }
  }, [history]);
  return (
    <div>
      <Nav isShowNav={true} />
      <div>HomePage</div>
    </div>
  );
};

export default HomePage;
