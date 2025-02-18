import React from "react";
import "./register.scss";
import { useHistory } from "react-router-dom";
const Register = () => {
  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };
  return (
    <div className="container p-5 mt-5">
      <div className="row login-container ">
        <div className="left col-7 d-none d-md-block p-3">
          <div className="title">VanDao :register</div>
          <div className="text">Personal Project</div>
        </div>
        <div className="right col-12 col-md-4 p-3">
          <div className="title d-sm-none d-block text-center">VanDao</div>
          {/*>=768:col-md-4:use,<=768 :col-12 */}
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
          />
          <input
            type="number"
            className="form-control mt-2"
            id="PhoneNumber"
            placeholder="PhoneNumber"
          />
          <input
            type="text"
            className="form-control mt-2"
            id="username"
            placeholder="username"
          />
          <input
            type="password"
            className="form-control mt-2"
            id="password"
            placeholder="Password"
          />
          <input
            type="password"
            className="form-control mt-2"
            id="confirmPassword"
            placeholder="confirmPassword"
          />
          <button className="btn btn-primary mt-3">Create account</button>
          <hr />
          <button className="btn btn-success" onClick={() => handleLogin()}>
            Already have a account ? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
