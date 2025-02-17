import "./App.scss";
import Login from "./Components/Login/Login";
import Nav from "./Components/Navigation/Nav";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/home" exact>
          HomePage
        </Route>
        <Route path="/user">User</Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">404 not found</Route>
      </Switch>
    </Router>
  );
}

export default App;
