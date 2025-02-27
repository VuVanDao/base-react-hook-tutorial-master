import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import "./Nav.scss";
import { NavLink } from "react-router-dom";
const NavHeader = (props) => {
  const { isShowNav } = props;
  return (
    <>
      {isShowNav && (
        <div>
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="#home">Home</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav navbarScroll" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto  my-2 my-lg-0">
                  <NavLink className="nav-link" to="/user">
                    User
                  </NavLink>

                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </Nav>

                <Nav className="">
                  <Nav.Item className="nav-link" to="/user">
                    Welcome
                  </Nav.Item>

                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
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
