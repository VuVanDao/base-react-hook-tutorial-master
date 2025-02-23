import React, { useEffect, useState } from "react";
import "./Login.scss";
import { useHistory } from "react-router-dom";
import { handleLogin } from "../../Services/userService";
import { toast } from "react-toastify";
const Login = () => {
  let history = useHistory();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let [errorEmail, setErrorEmail] = useState("");
  let [errorPassword, setErrorPassword] = useState("");
  useEffect(() => {
    sessionStorage.removeItem("account");
  }, []);
  const handleCreateNewAccount = () => {
    history.push("/register");
  };
  const handleOnChange = (value, id) => {
    switch (id) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;

      default:
        break;
    }
  };
  const handleValidate = () => {
    let checkEmail = true;
    let checkPassword = true;
    if (!email.includes("@gmail")) {
      setErrorEmail("Email should be have @gmail");
      checkEmail = false;
    } else {
      setErrorEmail("");
      checkEmail = true;
    }
    if (password.length < 8) {
      setErrorPassword("plz enter a password longer than 8 characters");
      checkPassword = false;
    } else {
      setErrorPassword("");
      checkPassword = true;
    }
    if (checkEmail && checkPassword) {
      return true;
    } else {
      return false;
    }
  };
  const handleLoginAccount = async () => {
    let check = handleValidate();
    if (check) {
      const result = await handleLogin(email, password);
      if (+result.errCode === 0) {
        toast.success(result.errMessage);
        setEmail("");
        setPassword("");
        let data = {
          isAuthenticated: true,
          token: "fake token",
        };
        sessionStorage.setItem("account", JSON.stringify(data));
        history.push("/");
      } else if (+result.errCode === -1) {
        toast.info(result.errMessage);
      }
    }
  };
  useEffect(() => {}, []);
  return (
    <div className="container p-5 ">
      <div className="row login-container">
        <div className="left col-7 d-none d-md-block p-3">
          <div className="title">VanDao: login</div>
          <div className="text">Personal Project</div>
        </div>
        <div className="right col-12 col-md-4 p-3">
          <div className="title d-sm-none d-block text-center">VanDao</div>
          {/*>=768:col-md-4:use,<=768 :col-12 */}
          <input
            type="email"
            className={errorEmail ? "form-control is-invalid" : "form-control"}
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => handleOnChange(e.target.value, "email")}
          />
          <span style={{ color: "red" }}>{errorEmail}</span>
          <input
            type="password"
            className={
              errorPassword
                ? "form-control is-invalid mt-2"
                : "form-control mt-2"
            }
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => handleOnChange(e.target.value, "password")}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                handleLoginAccount();
              }
            }}
          />
          <span style={{ color: "red" }}>{errorPassword}</span>

          <button className="btn btn-primary mt-3" onClick={handleLoginAccount}>
            Log In
          </button>
          <div className="mt-1 text-center">
            <a href="#!">Forgot your password?</a>
          </div>
          <hr />
          <button
            className="btn btn-success"
            onClick={() => handleCreateNewAccount()}
          >
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
