import Login from "./Components/Login/Login";
import Nav from "./Components/Navigation/Nav";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Register from "./Components/Register/register";
function App() {
  return (
    <div style={{ backgroundColor: "#f2f4f7", minHeight: "100vh" }}>
      <Router>
        <Nav />
        {/* <marquee>Welcome to my personal project (❁´◡`❁)</marquee> */}
        <Switch>
          <Route path="/home" exact>
            HomePage
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
    </div>
  );
}

export default App;
