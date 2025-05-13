import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SalesForm = () => {
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
            navigate("/");
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
            <h1 className="text-center my-4 display-1">
                Generate New Sale Receipt
            </h1>
            <Card className="p-3 shadow-sm">
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

                    <Button variant="primary" type="submit" className="mt-3">
                        Add Medicine
                    </Button>
                </Form>
            </Card>
        </>
    );
};

export default SalesForm;
