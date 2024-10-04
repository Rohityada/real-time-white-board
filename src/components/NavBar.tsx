import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useKeycloak } from '@react-keycloak/web';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  const { keycloak } = useKeycloak();

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">Whiteboard App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
        </Nav>
        {keycloak.authenticated ? (
          <Button onClick={() => keycloak.logout()}>Logout</Button>
        ) : (
          <Button onClick={() => keycloak.login()}>Login</Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;