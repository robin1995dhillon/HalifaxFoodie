import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../context/auth";

export default function NavbarComponent() {
  const { authentication } = useAuthState();
  const dispach = useAuthDispatch();
  const history = useHistory();
  const handleLogout = async () => {
    dispach({ type: "LOGOUT" });
    localStorage.removeItem("idToken");
    history.push("/login");
  };
  return (
    <Container className="py-3">
      <Navbar collapseOnSelect bg="light" expand="lg" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            Halifax-Foodie
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {authentication ? (
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          ) : (
            <Nav activeKey={window.location.pathname}>
              <LinkContainer to="/signup">
                <Nav.Link>User Signup</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/owner-signup">
                <Nav.Link>Owner Signup</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}
