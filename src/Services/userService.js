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
const GetAllUser = async (page, limit) => {
  return await axios.get(
    `http://localhost:8080/api/v1/get?page=${page}&limit=${limit}`
  );
};
const DeleteUser = async (id) => {
  return await axios.delete(`http://localhost:8080/api/v1/delete/${id}`);
};
export { handleCreateUser, handleLogin, GetAllUser, DeleteUser };
