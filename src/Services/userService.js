import axios from "axios";

const handleCreateAccountApi = async (
  email,
  Address,
  phoneNumber,
  username,
  password
) => {
  return await axios.post("http://localhost:8080/api/v1/create-account", {
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
const GetDetailUser = async (id) => {
  return await axios.get(`http://localhost:8080/api/v1/get-detail?id=${id}`);
};
const GetAllUser = async (page, limit) => {
  return await axios.get(
    `http://localhost:8080/api/v1/get?page=${page}&limit=${limit}`
  );
};
const DeleteUser = async (id) => {
  return await axios.delete(`http://localhost:8080/api/v1/delete/${id}`);
};
const handleCreateUserApi = async (
  email,
  address,
  phone,
  username,
  password,
  gender,
  group
) => {
  return await axios.post("http://localhost:8080/api/v1/post", {
    email,
    address,
    phone,
    username,
    password,
    gender,
    group,
  });
};
const getGroup = async (id) => {
  return await axios.get(`http://localhost:8080/api/v1/get-group`);
};
const handleUpdateUserApi = async (
  id,
  address,
  phone,
  username,
  gender,
  groupId
) => {
  return await axios.put("http://localhost:8080/api/v1/put", {
    id,
    address,
    phone,
    username,
    gender,
    groupId,
  });
};
export {
  handleCreateAccountApi,
  handleLogin,
  GetAllUser,
  DeleteUser,
  GetDetailUser,
  handleCreateUserApi,
  getGroup,
  handleUpdateUserApi,
};
