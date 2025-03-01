import React, { useEffect, useState } from "react";
import NavHeader from "../Navigation/Nav";
import {
  getGroup,
  handleGetRoles,
  handleGetRolesByGroup,
} from "../../Services/userService";
import { Col, Form, Row } from "react-bootstrap";
import _ from "lodash";

const GroupRoles = () => {
  let [listGroup, setListGroup] = useState([]);
  let [listRoles, setListRoles] = useState([]);
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
    let result = await handleGetRolesByGroup(value);
    if (result.errCode === 0) {
      //   console.log("result", result.data);
      let data = handleBuildDataRoles(result.data, listRoles);
      console.log("data", data);
      if (data && data.length > 0) {
        setListRolesAssigned(data);
      }
    }
  };
  const handleBuildDataRoles = (RolesByGroup, AllRoles) => {
    let result = [];
    // console.log("RolesByGroup", RolesByGroup);
    // console.log("AllRoles", AllRoles);

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
  const handleSubmitSelectedRoles = () => {};
  return (
    <div className="container">
      <NavHeader isShowNav={true} />
      <p>Select roles</p>
      <div>
        <Form>
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
              <p className="mt-3">
                <button className="btn btn-outline-primary">aa</button>
              </p>
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
        </Form>
      </div>
    </div>
  );
};

export default GroupRoles;
