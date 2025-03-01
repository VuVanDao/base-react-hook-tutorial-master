// import axios from "axios";
import axios from "../setup/customAxios";
const handleCreateAccountApi = async (
  email,
  Address,
  phoneNumber,
  username,
  password
) => {
  return await axios.post("/api/v1/create-account", {
    email,
    Address,
    phoneNumber,
    username,
    password,
  });
};
const handleLogin = async (email, password) => {
  return await axios.post("/api/v1/login", {
    email,
    password,
  });
};
const GetDetailUser = async (id) => {
  return await axios.get(`/api/v1/get-detail?id=${id}`);
};
const GetAllUser = async (page, limit) => {
  return await axios.get(`/api/v1/get?page=${page}&limit=${limit}`);
};
const DeleteUser = async (id) => {
  return await axios.delete(`/api/v1/delete/${id}`);
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
  return await axios.post("/api/v1/post", {
    email,
    address,
    phone,
    username,
    password,
    gender,
    group,
  });
};
const getGroup = async () => {
  return await axios.get(`/api/v1/get-group`);
};
const handleUpdateUserApi = async (
  id,
  address,
  phone,
  username,
  gender,
  groupId
) => {
  return await axios.put("/api/v1/put", {
    id,
    address,
    phone,
    username,
    gender,
    groupId,
  });
};
const getUserAccount = async () => {
  return axios.get("/api/v1/account");
};
const handleLogout = () => {
  return axios.get("/api/v1/logout");
};
const handleCreateRoles = (roles) => {
  return axios.post("/api/v1/save-roles", roles);
};
const handleGetRoles = () => {
  return axios.get("/api/v1/get-roles");
};
const handleDeleteRoles = (id) => {
  return axios.post(`/api/v1/delete-roles?id=${id}`);
};
const handleGetRolesByGroup = (groupId) => {
  return axios.get(`/api/v1/get-roles-by-group?id=${groupId}`);
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
  getUserAccount,
  handleLogout,
  handleCreateRoles,
  handleGetRoles,
  handleDeleteRoles,
  handleGetRolesByGroup,
};
