import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./Nav.scss";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import React from "react";
import { handleLogout } from "../../Services/userService";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
const NavHeader = (props) => {
  const history = useHistory();
  const { isShowNav } = props;
  const { name } = React.useContext(UserContext);
  const handleLogoutAccount = async () => {
    let result = await handleLogout();
    if (result.errCode === 0) {
      localStorage.removeItem("jwt");
      toast.info(result.errMessage);
      history.push("/login");
    }
  };
  return (
    <>
      {isShowNav && (
        <div>
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="/">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav navbarScroll" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto  my-2 my-lg-0">
                  <NavLink className="nav-link" to="/user">
                    User
                  </NavLink>
                </Nav>

                <Nav className="">
                  {name?.isAuthenticated ? (
                    <Nav.Item className="nav-link btn">
                      Welcome {name.username}!!
                    </Nav.Item>
                  ) : (
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  )}

                  <Nav.Item className="nav-link btn">Theme</Nav.Item>

                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      ChangePassword
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => handleLogoutAccount()}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      )}
    </>
  );
};

export default NavHeader;
