import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { getGroup, handleCreateUserApi } from "../../Services/userService";
import { toast } from "react-toastify";

const ModalCreateUser = (props) => {
  let { isShowModalCreateUser, setIsShowModalCreateUser, fetchListUser } =
    props;
  let [email, setEmail] = useState("");
  let [Address, setAddress] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [group, setGroup] = useState("");
  let [gender, setGender] = useState("");
  let [listGroup, setListGroup] = useState([]);

  let [errorEmail, setErrorEmail] = useState("");
  let [errorAddress, setErrorAddress] = useState("");
  let [errorPhoneNumber, setErrorPhoneNumber] = useState("");
  let [errorUsername, setErrorUsername] = useState("");
  let [errorPassword, setErrorPassword] = useState("");

  useEffect(() => {
    handleGetGroup();
  }, []);
  const handleGetGroup = async () => {
    let result = await getGroup();
    if (
      result.data.errCode === 0 &&
      result.data.data &&
      result.data.data.length > 0
    ) {
      setListGroup(result.data.data);
    }
  };
  const handleClose = () => {
    setEmail("");
    setAddress("");
    setPhoneNumber("");
    setUsername("");
    setPassword("");
    setGender("");
    setGroup("");
    fetchListUser();
    setIsShowModalCreateUser(!isShowModalCreateUser);
  };
  const handleOnChange = (value, id) => {
    switch (id) {
      case "email":
        setEmail(value);
        break;
      case "Address":
        setAddress(value);
        break;
      case "phone":
        setPhoneNumber(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
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
  const validate = () => {
    let checkEmail = true;
    let checkAddress = true;
    let checkPhoneNumber = true;
    let checkUserName = true;
    let checkPassword = true;

    if (!email.includes("@gmail")) {
      setErrorEmail("Email should be have @gmail");
      checkEmail = false;
    } else {
      setErrorEmail("");
      checkEmail = true;
    }
    if (Address.length < 8) {
      setErrorAddress("plz enter a Address longer than 8 number");
      checkAddress = false;
    } else {
      setErrorAddress("");
      checkAddress = true;
    }
    if (phoneNumber.length < 8) {
      setErrorPhoneNumber("plz enter a phoneNumber longer than 8 number");
      checkPhoneNumber = false;
    } else {
      setErrorPhoneNumber("");
      checkPhoneNumber = true;
    }
    if (username.length < 8) {
      setErrorUsername("plz enter a username longer than 8 number");
      checkUserName = false;
    } else {
      setErrorUsername("");
      checkUserName = true;
    }
    if (password.length < 8) {
      setErrorPassword("plz enter a password longer than 8 characters");
      checkPassword = false;
    } else {
      setErrorPassword("");
      checkPassword = true;
    }

    if (
      checkEmail &&
      checkAddress &&
      checkPhoneNumber &&
      checkUserName &&
      checkPassword
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleCreateUser = async () => {
    let checkResult = validate();
    console.log("checkResult", checkResult);
    if (checkResult === false) {
      console.log("error");
    } else {
      let result = await handleCreateUserApi(
        email,
        Address,
        phoneNumber,
        username,
        password,
        gender ? gender : 1,
        group ? group : 3
      );
      if (+result.data.errCode === 0) {
        toast.success(result.data.errMessage);
        handleClose();
      } else if (+result.data.errCode === 2) {
        toast.info(result.data.errMessage);
      }
    }
  };
  return (
    <>
      <Modal show={isShowModalCreateUser} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Form.Group className="mb-3" controlId="formBasicEmail " as={Col}>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => handleOnChange(e.target.value, "email")}
                />
                <Form.Text className="text-muted">{errorEmail}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhone" as={Col}>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Phone Number"
                  onChange={(e) => handleOnChange(e.target.value, "phone")}
                />
                <Form.Text className="text-muted">{errorPhoneNumber}</Form.Text>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                onChange={(e) => handleOnChange(e.target.value, "Address")}
              />
              <Form.Text className="text-muted">{errorAddress}</Form.Text>
            </Form.Group>

            <Row>
              <Form.Group
                className="mb-3"
                controlId="formBasicUserName"
                as={Col}
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  onChange={(e) => handleOnChange(e.target.value, "username")}
                />
                <Form.Text className="text-muted">{errorUsername}</Form.Text>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicPassword"
                as={Col}
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => handleOnChange(e.target.value, "password")}
                />
                <Form.Text className="text-muted">{errorPassword}</Form.Text>
              </Form.Group>
            </Row>

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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateUser}>
            Save Info
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
