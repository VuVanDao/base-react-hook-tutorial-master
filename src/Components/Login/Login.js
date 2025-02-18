import React from "react";
import "./Login.scss";
const Login = () => {
  return (
    <div className="container p-5 mt-5">
      <div className="row login-container ">
        <div className="left col-7 d-none d-md-block p-3">
          <div className="title">VanDao</div>
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
            type="password"
            className="form-control mt-2"
            id="password"
            placeholder="Password"
          />
          <button className="btn btn-primary mt-3">Log In</button>
          <div className="mt-1 text-center">
            <a href="#!">Forgot your password?</a>
          </div>
          <hr />
          <button className="btn btn-success">Create new account</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
