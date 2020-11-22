import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
export default () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Link to="/">
        <Navbar.Brand>Product</Navbar.Brand>
      </Link>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to='add'>Add</Nav.Link>
        </Nav>
    </Navbar>
  );
};
