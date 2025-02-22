import React, { useEffect, useState } from "react";
import Nav from "../Navigation/Nav";
import { GetAllUser } from "../../Services/userService";
import ReactPaginate from "react-paginate";
import ModalCreateUser from "../Modal/ModalCreateUser";
import ModalDeleteUser from "../Modal/ModalDeleteUser";
const User = () => {
  let [listUser, setListUser] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let currentLimit = 3;
  let [totalPages, setTotalPages] = useState(0);
  let [isShowModalCreateUser, setIsShowModalCreateUser] = useState(false);
  let [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false);
  let [deleteUserId, setDeleteUserId] = useState(0);
  useEffect(() => {
    fetchListUser();
  }, [currentPage]);
  const fetchListUser = async () => {
    let result = await GetAllUser(currentPage, currentLimit);
    if (result.data.errCode === 0 && result.data.data.users.length > 0) {
      setTotalPages(result.data.data.totalPage);
      setListUser(result.data.data.users);
    }
  };
  const handleUpdateUser = (id) => {
    console.log("id", id);
  };
  const handleDeleteUser = async (id) => {
    setIsShowModalDeleteUser(!isShowModalDeleteUser);
    setDeleteUserId(id);
  };
  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };
  return (
    <>
      <Nav isShowNav={true} />

      <div className="container mt-5">
        <div className="mb-5">
          <button
            className="btn btn-outline-primary"
            onClick={() => setIsShowModalCreateUser(!isShowModalCreateUser)}
          >
            Create user
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
            </tr>
          </thead>
          <tbody>
            {listUser &&
              listUser.length > 0 &&
              listUser.map(({ id, username, email, address, phone }, index) => (
                <tr key={`user-${index}`}>
                  <th scope="row">{id}</th>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{address}</td>
                  <td>{phone}</td>
                  <td style={{ display: "flex", gap: "10px" }}>
                    <button
                      className=" btn btn-primary"
                      onClick={() => handleUpdateUser(id)}
                    >
                      Update
                    </button>
                    <button
                      className=" btn btn-warning"
                      onClick={() => handleDeleteUser(id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#!">
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#!">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#!">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#!">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#!">
                Next
              </a>
            </li>
          </ul>
        </nav> */}
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
    </>
  );
};

export default User;
