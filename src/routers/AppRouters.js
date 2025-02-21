import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "../Components/HomePage/HomePage";
import Register from "../Components/Register/register";
import Login from "../Components/Login/Login";
import User from "../Components/User/user";
const AppRouters = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/user" exact>
          <User />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="*">404 not found</Route>
      </Switch>
    </>
  );
};

export default AppRouters;
