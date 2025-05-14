import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import VendorList from "./VendorList";

const VendorForm = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [vendor, setVendor] = useState({
        name: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setVendor({ ...vendor, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/api/vendors", vendor);
            alert("Vendor added!");
            navigate("/"); // go to list page after adding
        } catch (error) {
            console.error("Error adding vendor:", error);
            alert("Failed to add vendor.");
        }

        setVendor({
            name: "",
        });
    };

    return (
        <>
            <h1 className="text-center mt-4 display-1">Manage Vendors</h1>
            <hr />
            <div className="text-end">
                <Button variant="primary" onClick={handleShow} className="mt-4">
                    Add Vendor
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Vendor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Vendor Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={vendor.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-3"
                        >
                            Add Vendor
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={handleClose}
                            className="mt-3 ms-2"
                        >
                            Cancel
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <VendorList />
        </>
    );
};

export default VendorForm;
