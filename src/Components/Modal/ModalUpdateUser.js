import React, { useEffect, useState } from "react";
import {
  GetDetailUser,
  getGroup,
  handleUpdateUserApi,
} from "../../Services/userService";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const ModalUpdateUser = (props) => {
  let {
    isShowModalUpdateUser,
    setIsShowModalUpdateUser,
    updateUserId,
    fetchListUser,
  } = props;
  let [listGroup, setListGroup] = useState([]);
  let [email, setEmail] = useState("");

  let [address, setAddress] = useState("");
  let [phone, setPhone] = useState("");
  let [username, setUsername] = useState("");
  let [group, setGroup] = useState("");
  let [gender, setGender] = useState("");
  const handleClose = () => {
    setIsShowModalUpdateUser();
  };
  useEffect(() => {
    handleGetGroup();
    if (isShowModalUpdateUser) {
      handleGetDetailUser();
    }
  }, [isShowModalUpdateUser]);
  const handleGetGroup = async () => {
    let result = await getGroup();
    if (result.errCode === 0 && result.data && result.data.length > 0) {
      setListGroup(result.data);
    }
  };
  const handleGetDetailUser = async () => {
    let result = await GetDetailUser(updateUserId);
    if (result.errCode === 0 && result.data) {
      setEmail(result.data.email);
      setUsername(result.data.username);
      setAddress(result.data.address);
      setPhone(result.data.phone);
    }
  };
  const handleOnChange = (value, id) => {
    switch (id) {
      case "address":
        setAddress(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "group":
        setGroup(value);
        break;
      case "gender":
        setGender(value);
        break;

      default:
        break;
    }
  };
  const handleUpdateUser = async () => {
    let result = await handleUpdateUserApi(
      updateUserId,
      address,
      phone,
      username,
      gender ? gender : 3,
      group ? group : 3
    );
    if (result.data.errCode === 0) {
      toast.success(result.data.errMessage);
      fetchListUser();
      handleClose();
    } else {
      toast.error(result.data.errMessage);
    }
  };
  return (
    <>
      <Modal show={isShowModalUpdateUser} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Update user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email ? email : ""}
              disabled
            />
          </Form.Group>
          <Row>
            <Form.Group className="mb-3" controlId="username" as={Col}>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => handleOnChange(e.target.value, "username")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address" as={Col}>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => handleOnChange(e.target.value, "address")}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Control
              type="number"
              placeholder="Enter phone"
              value={phone}
              onChange={(e) => handleOnChange(e.target.value, "phone")}
            />
          </Form.Group>

          <Row>
            <Form.Group as={Col}>
              <Form.Label>Group</Form.Label>
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
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => handleOnChange(e.target.value, "gender")}
              >
                <option value="1" selected>
                  Male
                </option>
                <option value="2">Female</option>
                <option value="3">.....</option>
              </Form.Select>
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleUpdateUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
