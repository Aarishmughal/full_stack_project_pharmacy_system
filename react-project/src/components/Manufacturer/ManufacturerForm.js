import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ManufacturerList from "./ManufacturerList";
import Modal from "react-bootstrap/Modal";

const ManufacturerForm = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [manufacturer, setManufacturer] = useState({
        name: "",
        address: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setManufacturer({ ...manufacturer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/api/manufacturers",
                manufacturer
            );
            alert("Manufacturer added!");
            navigate("/"); // go to list page after adding
        } catch (error) {
            console.error("Error adding manufacturer:", error);
            alert("Failed to add manufacturer.");
        }

        setManufacturer({
            name: "",
            address: "",
        });
    };

    return (
        <>
            <h1 className="text-center mt-4 display-1">Manage Manufacturers</h1>
            <hr />
            <div className="text-end">
                <Button variant="primary" onClick={handleShow} className="mt-4">
                    Add Manufacturer
                </Button>
            </div>

            <Modal show={show} onHide={handleClose} className="shadow-lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add New Manufacturer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Manufacturer Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={manufacturer.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="manufacturer">
                            <Form.Label>Address</Form.Label>
                            <textarea
                                className="form-control"
                                rows="4"
                                type="text"
                                name="address"
                                value={manufacturer.address}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-3"
                        >
                            Add Manufacturer
                        </Button>
                        <Button
                            variant="secondary"
                            className="mt-3 ms-2"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <ManufacturerList />
        </>
    );
};

export default ManufacturerForm;
