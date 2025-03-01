import React, { useEffect, useState } from "react";

import { handleDeleteRoles, handleGetRoles } from "../../Services/userService";
import { toast } from "react-toastify";

const TableRoles = (props) => {
  let [listRoles, setListRoles] = useState([]);
  useEffect(() => {
    fetchGetAllRole();
  }, []);

  const fetchGetAllRole = async () => {
    let result = await handleGetRoles();
    if (result.errCode === 0) {
      setListRoles(result.data);
    }
  };
  const handleDeleteRole = async (id) => {
    let result = await handleDeleteRoles(id);
    if (result.errCode === 0) {
      toast.success(result.errMessage);
      fetchGetAllRole();
    }
  };

  return (
    <>
      <div className="container mt-3">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Url</th>
              <th scope="col">Description</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {listRoles && listRoles.length > 0
              ? listRoles.map(({ id, url, description }, index) => (
                  <tr key={`roles-${index}`}>
                    <th scope="row">{id}</th>
                    <td>{url}</td>
                    <td>{description}</td>
                    <td style={{ display: "flex", gap: "10px" }}>
                      <button
                        className=" btn btn-primary"
                        // onClick={() => handleUpdateUser(id)}
                      >
                        <i className="fa fa-pencil-square-o"></i>
                        <span>Update</span>
                      </button>
                      <button
                        className=" btn btn-warning"
                        onClick={() => handleDeleteRole(id)}
                      >
                        <i className="fa fa-trash-o"></i>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableRoles;
