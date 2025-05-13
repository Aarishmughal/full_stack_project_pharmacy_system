import { Navbar as RBNavbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import "../App.css";

const Navbar = () => (
    <RBNavbar
        bg="dark-subtle"
        variant="dark-subtle"
        expand="lg"
        sticky="top"
        className="shadow-lg"
    >
        <div className="d-flex justify-content-between align-items-center w-100 px-5">
            <RBNavbar.Brand as={NavLink} to="/">
                <img
                    src="logo.png"
                    height="100px"
                    alt="Pharmacy Management System"
                />
            </RBNavbar.Brand>
            <RBNavbar.Toggle aria-controls="basic-navbar-nav" />
            <RBNavbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/" className="nav-link-custom">
                        <i class="bi bi-house-fill"></i> Home
                    </Nav.Link>
                    <Nav.Link
                        as={NavLink}
                        to="/sales"
                        className="nav-link-custom"
                    >
                        <i className="bi bi-plus-circle"></i> Genrate Sale
                        Receipt
                    </Nav.Link>
                    <Nav.Link
                        as={NavLink}
                        to="/sales"
                        className="nav-link-custom"
                    >
                        <i className="bi bi-receipt-cutoff"></i> Sale Receipt
                    </Nav.Link>
                    <Nav.Link
                        as={NavLink}
                        to="/medicine"
                        className="nav-link-custom"
                    >
                        <i className="bi bi-capsule"></i> Medicine
                    </Nav.Link>

                    <Nav.Link
                        as={NavLink}
                        to="/medicine"
                        className="nav-link-custom"
                    >
                        <i className="bi bi-person-lines-fill"></i>{" "}
                        Manufacturers
                    </Nav.Link>
                    <Nav.Link
                        as={NavLink}
                        to="/medicine"
                        className="nav-link-custom"
                    >
                        <i className="bi bi-archive-fill"></i> Vendors
                    </Nav.Link>
                    <Nav.Link
                        as={NavLink}
                        to="/customers"
                        className="nav-link-custom"
                    >
                        <i className="bi bi-person-fill"></i> Customers
                    </Nav.Link>
                </Nav>
                <Nav.Link as={NavLink} to="/" className="nav-link-custom">
                    <i className="bi bi-person-fill-gear"></i> Admins
                </Nav.Link>
                <Nav.Link as={NavLink} to="/" className="nav-link-custom">
                    <i className="bi bi-key-fill"></i> Logout
                </Nav.Link>
            </RBNavbar.Collapse>
        </div>
    </RBNavbar>
);

export default Navbar;
