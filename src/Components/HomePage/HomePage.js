import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../Navigation/Nav";
import { UserContext } from "../../Context/UserContext";

const HomePage = () => {
  let history = useHistory();
  const { name } = React.useContext(UserContext);
  useEffect(() => {
    console.log(">>>>>>", name);
  }, []);
  return (
    <div>
      <Nav isShowNav={true} />
      <div>HomePage</div>
    </div>
  );
};

export default HomePage;
