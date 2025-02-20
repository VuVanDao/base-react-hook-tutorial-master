import axios from "axios";

const handleCreateUser = async (
  email,
  Address,
  phoneNumber,
  username,
  password
) => {
  return await axios.post("http://localhost:8080/api/v1/create", {
    email,
    Address,
    phoneNumber,
    username,
    password,
  });
};
const handleLogin = async (email, password) => {
  return await axios.post("http://localhost:8080/api/v1/login", {
    email,
    password,
  });
};
export { handleCreateUser, handleLogin };
