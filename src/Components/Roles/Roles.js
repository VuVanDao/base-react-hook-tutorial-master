import React, { useEffect, useRef, useState } from "react";
import NavHeader from "../Navigation/Nav";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { handleCreateRoles, handleGetRoles } from "../../Services/userService";
import AllRoles from "./tableRoles";
const Roles = () => {
  let [listChild, setListChild] = useState([
    { uuId: uuidv4(), url: "", description: "" },
  ]);
  const childRef = useRef();
  const fetchGetAllRole = async () => {
    await handleGetRoles();
  };
  const handleAddMoreRole = () => {
    setListChild([...listChild, { uuId: uuidv4(), url: "", description: "" }]);
  };
  const handleOnChange = (value, index, id) => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[index][id] = value;
    setListChild(_listChild);
  };
  const validateRole = () => {
    let check = true;
    let _listChildClone = _.cloneDeep(listChild);
    _listChildClone.map(({ url, description }) => {
      if (!url || !description || description.length < 3) {
        check = false;
      }
    });
    return check;
  };
  const handleSubmitRole = async () => {
    let check = validateRole();
    if (check) {
      let result = await handleCreateRoles(listChild);
      if (result.errCode === 0) {
        setListChild([{ uuId: uuidv4(), url: "", description: "" }]);
        await fetchGetAllRole();
        toast.success(result.errMessage);
      }
    } else {
      toast.error("not complete ");
    }
  };

  const handleDeleteARow = (id) => {
    let _listChildClone = _.cloneDeep(listChild);
    _listChildClone = _listChildClone.filter((item) => item.uuId !== id);
    setListChild(_listChildClone);
  };
  return (
    <>
      <NavHeader isShowNav={true} />
      <div className="container">
        <div className="title my-3">Add new roles for group</div>
        {listChild &&
          listChild.length > 0 &&
          listChild.map(({ uuId, url, description }, index) => (
            <div className="row align-items-center" key={`div-${index}`}>
              <div className="mb-3 col-4">
                <label htmlFor="roles" className="form-label">
                  URL for role
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="roles"
                  aria-descriptioncribedby="emailHelp"
                  value={url}
                  onChange={(e) => handleOnChange(e.target.value, index, "url")}
                />
              </div>
              <div className="mb-3 col-4">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  descriptioncription
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={description}
                  onChange={(e) =>
                    handleOnChange(e.target.value, index, "description")
                  }
                />
              </div>
              <div className="col-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => handleAddMoreRole()}
                >
                  more..
                </button>
                {listChild.length > 1 && (
                  <button
                    type="submit"
                    className="btn btn-danger mx-2"
                    onClick={() => handleDeleteARow(uuId)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}

        <div className="col-3 mt-3">
          <button
            type="submit"
            className="btn btn-primary "
            onClick={() => handleSubmitRole()}
          >
            Add....
          </button>
        </div>
        <hr />
      </div>
      <AllRoles />
    </>
  );
};

export default Roles;
