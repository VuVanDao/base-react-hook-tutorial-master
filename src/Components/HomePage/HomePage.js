import React, { useEffect } from "react";
import Nav from "../Navigation/Nav";

const HomePage = () => {
  useEffect(() => {}, []);
  return (
    <div>
      <Nav isShowNav={true} />
      <div>HomePage</div>
    </div>
  );
};

export default HomePage;
