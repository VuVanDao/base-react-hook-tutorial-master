import React, { useState } from "react";
import "./register.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Register = () => {
  let history = useHistory();
  let [email, setEmail] = useState("");
  let [Address, setAddress] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  let [errorEmail, setErrorEmail] = useState("");
  let [errorAddress, setErrorAddress] = useState("");
  let [errorPhoneNumber, setErrorPhoneNumber] = useState("");
  let [errorUsername, setErrorUsername] = useState("");
  let [errorPassword, setErrorPassword] = useState("");
  let [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  let handleOnChange = (value, id) => {
    switch (id) {
      case "email":
        setEmail(value);
        break;
      case "Address":
        setAddress(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };
  const handleLogin = () => {
    history.push("/login");
  };
  const validate = () => {
    let checkEmail = true;
    let checkAddress = true;
    let checkPhoneNumber = true;
    let checkUserName = true;
    let checkPassword = true;
    let checkConfirmPassword = true;
    if (!email.includes("@gmail")) {
      setErrorEmail("Email should be have @gmail");
      checkEmail = false;
    } else {
      setErrorEmail("");
      checkEmail = true;
    }
    if (Address.length < 8) {
      setErrorAddress("plz enter a Address longer than 8 number");
      checkAddress = false;
    } else {
      setErrorAddress("");
      checkAddress = true;
    }
    if (phoneNumber.length < 8) {
      setErrorPhoneNumber("plz enter a phoneNumber longer than 8 number");
      checkPhoneNumber = false;
    } else {
      setErrorPhoneNumber("");
      checkPhoneNumber = true;
    }
    if (username.length < 8) {
      setErrorUsername("plz enter a username longer than 8 number");
      checkUserName = false;
    } else {
      setErrorUsername("");
      checkUserName = true;
    }
    if (password.length < 8) {
      setErrorPassword("plz enter a password longer than 8 characters");
      checkPassword = false;
    } else {
      setErrorPassword("");
      checkPassword = true;
    }
    if (password === "" || password !== confirmPassword) {
      setErrorConfirmPassword("confirm password is not like password");
      checkConfirmPassword = false;
    } else {
      setErrorConfirmPassword("");
      checkConfirmPassword = true;
    }
    if (
      checkEmail &&
      checkAddress &&
      checkPhoneNumber &&
      checkUserName &&
      checkPassword &&
      checkConfirmPassword
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleCreateAccount = async () => {
    const check = validate();
    if (check === false) {
      console.log("error");
    } else {
      let result = await axios.post("http://localhost:8080/api/v1/create", {
        email,
        Address,
        phoneNumber,
        username,
        password,
      });
      if (result.data.errCode === 0) {
        toast.success(result.data.errMessage);
        setEmail("");
        setAddress("");
        setPhoneNumber("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      } else if (result.data.errCode === 2) {
        toast.info(result.data.errMessage);
      }
    }
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
            className={errorEmail ? "form-control is-invalid" : "form-control"}
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => handleOnChange(e.target.value, "email")}
          />
          <span style={{ color: "red" }}>{errorEmail}</span>
          <input
            type="text"
            className={
              errorAddress
                ? "form-control is-invalid mt-2"
                : "form-control mt-2"
            }
            id="Address"
            placeholder="Address"
            value={Address}
            onChange={(e) => handleOnChange(e.target.value, "Address")}
          />
          <span style={{ color: "red" }}>{errorAddress}</span>
          <input
            type="number"
            className={
              errorPhoneNumber
                ? "form-control is-invalid mt-2"
                : "form-control mt-2"
            }
            id="phoneNumber"
            placeholder="phoneNumber"
            value={phoneNumber}
            onChange={(e) => handleOnChange(e.target.value, "phoneNumber")}
          />
          <span style={{ color: "red" }}>{errorPhoneNumber}</span>
          <input
            type="text"
            className={
              errorUsername
                ? "form-control is-invalid mt-2"
                : "form-control mt-2"
            }
            id="username"
            placeholder="username"
            value={username}
            onChange={(e) => handleOnChange(e.target.value, "username")}
          />
          <span style={{ color: "red" }}>{errorUsername}</span>
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
          />
          <span style={{ color: "red" }}>{errorPassword}</span>
          <input
            type="password"
            className={
              errorConfirmPassword
                ? "form-control is-invalid mt-2"
                : "form-control mt-2"
            }
            id="confirmPassword"
            placeholder="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleOnChange(e.target.value, "confirmPassword")}
          />
          <span style={{ color: "red" }}>{errorConfirmPassword}</span>
          <button
            className="btn btn-primary mt-3"
            onClick={() => handleCreateAccount()}
          >
            Create account
          </button>
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
