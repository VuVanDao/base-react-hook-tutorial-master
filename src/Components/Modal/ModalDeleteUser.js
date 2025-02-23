import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { DeleteUser, GetDetailUser } from "../../Services/userService";
import { toast } from "react-toastify";

const ModalDeleteUser = (props) => {
  let {
    isShowModalDeleteUser,
    setIsShowModalDeleteUser,
    deleteUserId,
    fetchListUser,
  } = props;
  let [detailUser, setDetailUser] = useState({});
  const handleClose = () => {
    setIsShowModalDeleteUser();
  };
  useEffect(() => {
    if (isShowModalDeleteUser) {
      handleGetDetailUser();
    }
  }, [isShowModalDeleteUser]);
  const handleGetDetailUser = async () => {
    let result = await GetDetailUser(deleteUserId);
    if (result.errCode === 0 && result.data) {
      setDetailUser(result.data);
    }
  };
  const handleDeleteUser = async () => {
    let result = await DeleteUser(deleteUserId);
    if (result.errCode === 0) {
      toast.success(result.errMessage);
      fetchListUser();
      handleClose();
    } else {
      toast.error(result.errMessage);
    }
  };
  return (
    <>
      <Modal show={isShowModalDeleteUser} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={detailUser.email ? detailUser.email : ""}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="username">
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={detailUser.username ? detailUser.username : ""}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={detailUser.address ? detailUser.address : ""}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Control
              type="number"
              placeholder="Enter phone"
              value={detailUser.phone ? detailUser.phone : ""}
              disabled
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDeleteUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
