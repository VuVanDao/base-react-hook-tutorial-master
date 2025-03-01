import React, { useState } from "react";
import NavHeader from "../Navigation/Nav";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { handleCreateRoles } from "../../Services/userService";

const Roles = () => {
  let [listChild, setListChild] = useState([
    { id: uuidv4(), url: "", des: "" },
  ]);
  const handleAddMoreRole = () => {
    setListChild([...listChild, { id: uuidv4(), url: "", des: "" }]);
  };
  const handleOnChange = (value, index, id) => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[index][id] = value;
    setListChild(_listChild);
  };
  const validateRole = () => {
    let check = true;
    let _listChildClone = _.cloneDeep(listChild);
    _listChildClone.map(({ url, des }) => {
      if (!url || !des || des.length < 3) {
        check = false;
      }
    });
    return check;
  };
  const handleSubmitRole = async () => {
    let check = validateRole();
    if (check) {
      console.log("<><>", listChild);
      let result = await handleCreateRoles(listChild);
      if (result.errCode === 0) {
        setListChild([{ id: uuidv4(), url: "", des: "" }]);
      }
    } else {
      toast.error("not complete ");
    }
  };
  const handleDeleteARow = (id) => {
    let _listChildClone = _.cloneDeep(listChild);
    _listChildClone = _listChildClone.filter((item) => item.id !== id);
    setListChild(_listChildClone);
  };
  return (
    <>
      <NavHeader isShowNav={true} />
      <div className="container">
        <div className="title my-3">Add new roles for group</div>
        {/* {
          Object.entries(listChild).map(([keyBy, value]) => {
               {
                  <form className="row align-items-center">
          <div className="mb-3 col-4">
            <label for="roles" className="form-label">
              URL for role
            </label>
            <input
              type="text"
              className="form-control"
              id="roles"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-4">
            <label for="exampleInputPassword1" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="col-2 mt-3">
            <button type="submit" className="btn btn-primary ">
              more..
            </button>
            <button type="submit" className="btn btn-danger mx-2">
              Delete
            </button>
          </div>
          <div className="col-3 mt-3">
            <button type="submit" className="btn btn-primary ">
              Add....
            </button>
          </div>
        </form> 
               }
          })
        } */}
        {listChild &&
          listChild.length > 0 &&
          listChild.map(({ id, url, des }, index) => (
            <div className="row align-items-center" key={`div-${index}`}>
              <div className="mb-3 col-4">
                <label htmlFor="roles" className="form-label">
                  URL for role
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="roles"
                  aria-describedby="emailHelp"
                  value={url}
                  onChange={(e) => handleOnChange(e.target.value, index, "url")}
                />
              </div>
              <div className="mb-3 col-4">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={des}
                  onChange={(e) => handleOnChange(e.target.value, index, "des")}
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
                    onClick={() => handleDeleteARow(id)}
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
      </div>
    </>
  );
};

export default Roles;
