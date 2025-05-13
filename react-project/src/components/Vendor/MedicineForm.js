import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MedicineList from "./MedicineList";
import Modal from "react-bootstrap/Modal";

const MedicineForm = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [medicine, setMedicine] = useState({
        name: "",
        manufacturer: "",
        price: "",
        quantity: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setMedicine({ ...medicine, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/api/medicines", medicine);
            alert("Medicine added!");
            navigate("/"); // go to list page after adding
        } catch (error) {
            console.error("Error adding medicine:", error);
            alert("Failed to add medicine.");
        }

        setMedicine({
            name: "",
            manufacturer: "",
            price: "",
            quantity: "",
        });
    };

    return (
        <>
            <h1 className="text-center mt-4 display-1">Manage Medicine</h1>
            <hr />
            <div className="text-end">
                <Button variant="primary" onClick={handleShow} className="mt-4">
                    Add Medicine
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Medicine</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Medicine Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={medicine.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="manufacturer">
                            <Form.Label>Manufacturer</Form.Label>
                            <Form.Control
                                type="text"
                                name="manufacturer"
                                value={medicine.manufacturer}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={medicine.price}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={medicine.quantity}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-3"
                        >
                            Add Medicine
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <MedicineList />
        </>
    );
};

export default MedicineForm;
