import { Navbar as RBNavbar, Nav, Container } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => (
    <RBNavbar expand="lg" sticky="top">
        <div className="d-flex justify-content-between align-items-center w-100 px-5">
            <RBNavbar.Brand as={Link} to="/">
                <img
                    src="logo.png"
                    height="100px"
                    alt="Pharmacy Management System"
                />
            </RBNavbar.Brand>
            <RBNavbar.Toggle aria-controls="basic-navbar-nav" />
            <RBNavbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/" className="nav-link-custom">
                        <i class="bi bi-house-fill"></i> Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/" className="nav-link-custom">
                        <i className="bi bi-receipt-cutoff"></i> Generate Sale
                        Receipt
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/medicine"
                        className="nav-link-custom"
                    >
                        <i className="bi bi-capsule"></i> Manage Medicine
                    </Nav.Link>
                    <Nav.Link as={Link} to="/" className="nav-link-custom">
                        <i className="bi bi-person-fill"></i> Manage Customers
                    </Nav.Link>
                </Nav>
                <Navbar.Text>
                    Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
                <Nav.Link as={Link} to="/" className="nav-link-custom">
                    <i className="bi bi-key-fill"></i> Logout
                </Nav.Link>
                {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                        Something else here
                    </NavDropdown.Item>
                </NavDropdown> */}
            </RBNavbar.Collapse>
        </div>
    </RBNavbar>
);

export default Navbar;
