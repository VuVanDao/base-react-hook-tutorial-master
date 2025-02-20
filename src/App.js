import Login from "./Components/Login/Login";
import Nav from "./Components/Navigation/Nav";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Register from "./Components/Register/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import _ from "lodash";
import HomePage from "./Components/HomePage/HomePage";
function App() {
  let [account, setAccount] = useState({});
  // useEffect(() => {
  //   let session = sessionStorage.getItem("account");
  //   if (session) {
  //     setAccount(JSON.parse(session));
  //   }
  // }, [account]);

  return (
    <div style={{ backgroundColor: "#f2f4f7", minHeight: "100vh" }}>
      <Router>
        {/* {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />} */}
        {/* <marquee>Welcome to my personal project (❁´◡`❁)</marquee> */}
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/user">User</Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="*">404 not found</Route>
        </Switch>
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
