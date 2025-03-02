import React, { useEffect, useState } from "react";
import NavHeader from "../Navigation/Nav";
import {
  getGroup,
  handleGetAssignByGroup,
  handleGetRoles,
  handleGetRolesByGroup,
} from "../../Services/userService";
import { Col, Form, Row } from "react-bootstrap";
import _ from "lodash";
import { toast } from "react-toastify";

const GroupRoles = () => {
  let [listGroup, setListGroup] = useState([]);
  let [listRoles, setListRoles] = useState([]);
  let [groupSelected, setGroupSelected] = useState(0);
  let [listRolesAssigned, setListRolesAssigned] = useState([]);

  useEffect(() => {
    handleGetGroup();
    fetchGetAllRole();
  }, []);
  const handleGetGroup = async () => {
    let result = await getGroup();
    if (result.errCode === 0 && result.data && result.data.length > 0) {
      setListGroup([{ id: 0, name: "plz choose your group" }, ...result.data]);
    }
  };
  const fetchGetAllRole = async () => {
    let result = await handleGetRoles();
    if (result.errCode === 0) {
      setListRoles(result.data);
    }
  };
  const handleOnChange = async (value, id) => {
    setGroupSelected(value);
    let result = await handleGetRolesByGroup(value);
    if (result.errCode === 0) {
      let data = handleBuildDataRoles(result.data, listRoles);
      if (data && data.length > 0) {
        setListRolesAssigned(data);
      }
    }
  };
  const handleBuildDataRoles = (RolesByGroup, AllRoles) => {
    let result = [];
    if (RolesByGroup || AllRoles) {
      AllRoles.map((item, index) => {
        let object = {};
        object.id = item.id;
        object.url = item.url;
        object.description = item.description;
        object.isAssigned = false;
        if (RolesByGroup && RolesByGroup.length > 0) {
          object.isAssigned = RolesByGroup.some(
            (item) => item.Roles.url === object.url
          );
        }
        result.push(object);
      });
    }
    return result;
  };
  const handleCheckRole = (value) => {
    let _listRolesAssigned = _.cloneDeep(listRolesAssigned);
    let index = _listRolesAssigned.findIndex((item) => {
      if (item.id === value) {
        return item;
      }
    });
    _listRolesAssigned[index].isAssigned =
      !_listRolesAssigned[index].isAssigned;
    setListRolesAssigned(_listRolesAssigned);
  };
  const handleSubmitSelectedRoles = async () => {
    let data = {};
    data.groupId = groupSelected;
    let roleId = listRolesAssigned.filter((item) => item.isAssigned === true);
    data.roleId = roleId.map((item) => ({
      groupId: +groupSelected,
      roleId: item.id,
    }));
    console.log(">>", data.groupId, data.roleId);
    let result = await handleGetAssignByGroup(data);
    if (result.errCode === 0) {
      toast.success(result.errMessage);
    } else {
      toast.danger(result.errMessage);
    }
  };
  return (
    <div className="container">
      <NavHeader isShowNav={true} />
      <p>Select roles</p>
      <div>
        <div>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Select group</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => handleOnChange(e.target.value, "group")}
              >
                {listGroup &&
                  listGroup.map(({ id, name, description }, index) => (
                    <option value={id} key={`group-${index}`}>
                      {name}
                    </option>
                  ))}
              </Form.Select>
              {groupSelected > 0 && (
                <p className="mt-3">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleSubmitSelectedRoles()}
                  >
                    aa
                  </button>
                </p>
              )}
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Select roles</Form.Label>
              {listRolesAssigned &&
                listRolesAssigned.map(
                  ({ id, url, description, isAssigned }, index) => (
                    <div className="form-check" key={`roles-${index}`}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={id}
                        checked={isAssigned}
                        onChange={() => handleCheckRole(id)}
                      />
                      <label className="form-check-label">{url}</label>
                    </div>
                  )
                )}
            </Form.Group>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default GroupRoles;
