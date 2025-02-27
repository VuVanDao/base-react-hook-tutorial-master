import React, { useEffect, useState } from "react";
import Nav from "../Navigation/Nav";
import { GetAllUser } from "../../Services/userService";
import ReactPaginate from "react-paginate";
import ModalCreateUser from "../Modal/ModalCreateUser";
import ModalDeleteUser from "../Modal/ModalDeleteUser";
import ModalUpdateUser from "../Modal/ModalUpdateUser";
import { UserContext } from "../../Context/UserContext";
import {
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { Audio } from "react-loader-spinner";
const User = () => {
  let history = useHistory();
  let [listUser, setListUser] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [currentPage, setCurrentPage] = useState(1);
  let currentLimit = 3;
  let [totalPages, setTotalPages] = useState(0);
  let [isShowModalCreateUser, setIsShowModalCreateUser] = useState(false);
  let [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false);
  let [isShowModalUpdateUser, setIsShowModalUpdateUser] = useState(false);
  let [deleteUserId, setDeleteUserId] = useState(0);
  let [updateUserId, setUpdateUserId] = useState(0);
  const { name } = React.useContext(UserContext);
  useEffect(() => {
    fetchListUser();
  }, [currentPage]);
  const fetchListUser = async () => {
    let result = await GetAllUser(currentPage, currentLimit);
    setIsLoading(true);
    if (result.errCode === 0 && result.data.users.length > 0) {
      setTotalPages(result.data.totalPage);
      setListUser(result.data.users);
    } else {
      setIsLoading(false);
      history.push("/login");
    }
  };
  const handleUpdateUser = (id) => {
    setIsShowModalUpdateUser(!isShowModalDeleteUser);
    setUpdateUserId(id);
  };
  const handleDeleteUser = async (id) => {
    setIsShowModalDeleteUser(!isShowModalDeleteUser);
    setDeleteUserId(id);
  };
  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };
  if (!name?.isAuthenticated) {
    return <Redirect to="/login" />;
  } else {
    return (
      <>
        <Nav isShowNav={true} />
        {isLoading ? (
          <>
            <div className="container mt-5">
              <div className="mb-5">
                <button
                  className="btn btn-outline-success mx-2"
                  onClick={() => fetchListUser()}
                >
                  <i className="fa fa-refresh"></i>
                  <span>refresh</span>
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={() =>
                    setIsShowModalCreateUser(!isShowModalCreateUser)
                  }
                >
                  <i className="fa fa-plus-square-o"></i>
                  <span> Create user</span>
                </button>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Group</th>
                    <th scope="col">Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {listUser &&
                    listUser.length > 0 &&
                    listUser.map(
                      (
                        { id, username, email, address, phone, Group, gender },
                        index
                      ) => (
                        <tr key={`user-${index}`}>
                          <th scope="row">{id}</th>
                          <td>{username}</td>
                          <td>{email}</td>
                          <td>{address}</td>
                          <td>{phone}</td>
                          <td>{Group.name}</td>
                          <td>{gender}</td>
                          <td style={{ display: "flex", gap: "10px" }}>
                            <button
                              className=" btn btn-primary"
                              onClick={() => handleUpdateUser(id)}
                            >
                              <i className="fa fa-pencil-square-o"></i>
                              <span>Update</span>
                            </button>
                            <button
                              className=" btn btn-warning"
                              onClick={() => handleDeleteUser(id)}
                            >
                              <i className="fa fa-trash-o"></i>
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
              {totalPages > 0 && (
                <ReactPaginate
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={totalPages}
                  previousLabel="< previous"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
              )}
            </div>
            <ModalCreateUser
              isShowModalCreateUser={isShowModalCreateUser}
              setIsShowModalCreateUser={setIsShowModalCreateUser}
              fetchListUser={fetchListUser}
            />
            <ModalDeleteUser
              isShowModalDeleteUser={isShowModalDeleteUser}
              setIsShowModalDeleteUser={setIsShowModalDeleteUser}
              deleteUserId={deleteUserId}
              fetchListUser={fetchListUser}
            />
            <ModalUpdateUser
              isShowModalUpdateUser={isShowModalUpdateUser}
              setIsShowModalUpdateUser={setIsShowModalUpdateUser}
              updateUserId={updateUserId}
              fetchListUser={fetchListUser}
            />
          </>
        ) : (
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Audio
              height="80"
              width="80"
              radius="9"
              color="#0d6efd"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          </div>
        )}
      </>
    );
  }
};

export default User;
