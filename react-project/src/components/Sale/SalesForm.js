import { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SalesForm = () => {
    // Customer state
    const [customer, setCustomer] = useState({
        name: "",
        phone: "",
        address: "",
    });

    // All medicines in system
    const [allMedicines, setAllMedicines] = useState([]);

    // Dynamic medicines list
    const [medicines, setMedicines] = useState([
        {
            medicineId: "",
            name: "",
            manufacturer: "",
            price: "",
            quantity: "",
            total: 0,
        },
    ]);

    const navigate = useNavigate();

    // Fetch all medicines
    useEffect(() => {
        const fetchData = async () => {
            const medRes = await axios.get(
                "http://localhost:5000/api/medicines"
            );
            setAllMedicines(medRes.data);
        };
        fetchData();
    }, []);

    // Customer info change
    const handleCustomerChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    // Medicine dropdown change
    const handleMedicineSelect = (index, e) => {
        const medicineId = e.target.value;
        const medObj = allMedicines.find((m) => m._id === medicineId);
        setMedicines((prev) =>
            prev.map((med, i) => {
                if (i !== index) return med;
                return {
                    ...med,
                    medicineId,
                    name: medObj?.name || "",
                    manufacturer: medObj?.manufacturer || "",
                    price: medObj?.price || "",
                    quantity: "",
                    total: 0,
                };
            })
        );
    };

    // Medicine field change (quantity, price override)
    const handleMedicineChange = (index, e) => {
        const { name, value } = e.target;
        setMedicines((prev) =>
            prev.map((med, i) => {
                if (i !== index) return med;
                const updated = {
                    ...med,
                    [name]: value,
                };
                if (name === "price" || name === "quantity") {
                    const price = name === "price" ? value : med.price;
                    const quantity = name === "quantity" ? value : med.quantity;
                    updated.total = Number(price || 0) * Number(quantity || 0);
                }
                return updated;
            })
        );
    };

    // Add new medicine row
    const addMedicine = () => {
        setMedicines([
            ...medicines,
            {
                medicineId: "",
                name: "",
                manufacturer: "",
                price: "",
                quantity: "",
                total: 0,
            },
        ]);
    };

    // Remove medicine row
    const removeMedicine = (index) => {
        setMedicines(medicines.filter((_, i) => i !== index));
    };

    // Calculate grand total
    const grandTotal = medicines.reduce(
        (sum, med) => sum + Number(med.total || 0),
        0
    );

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const receipt = {
            customer,
            medicines: medicines.map((med) => ({
                medicineId: med.medicineId,
                name: med.name,
                manufacturer: med.manufacturer,
                price: Number(med.price),
                quantity: Number(med.quantity),
                total: Number(med.total),
            })),
            grandTotal,
            date: new Date().toISOString(), // Save receipt date
        };
        try {
            // Save customer info to customers.json
            await axios.post("http://localhost:5000/api/customers", customer);
            // Save receipt
            await axios.post("http://localhost:5000/api/receipts", receipt);
            alert("Receipt created!");
            navigate("/");
        } catch (error) {
            console.error("Error creating receipt or customer:", error);
            alert("Failed to create receipt or customer.");
        }
    };

    return (
        <>
            <h1 className="text-center my-4 display-1">
                Generate New Sale Receipt
            </h1>
            <Card className="p-3 shadow-sm">
                <Form onSubmit={handleSubmit}>
                    <h4>Customer Information</h4>
                    <Form.Group controlId="customerName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={customer.name}
                            onChange={handleCustomerChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="customerPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={customer.phone}
                            onChange={handleCustomerChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="customerAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={customer.address}
                            onChange={handleCustomerChange}
                            required
                        />
                    </Form.Group>

                    <h4 className="mt-4">Medicines</h4>
                    {medicines.map((med, idx) => (
                        <Row key={idx} className="align-items-end mb-2">
                            <Col>
                                <Form.Group>
                                    <Form.Label>Medicine</Form.Label>
                                    <Form.Select
                                        value={med.medicineId}
                                        onChange={(e) =>
                                            handleMedicineSelect(idx, e)
                                        }
                                        required
                                    >
                                        <option value="">
                                            Select Medicine
                                        </option>
                                        {allMedicines.map((m) => (
                                            <option key={m._id} value={m._id}>
                                                {m.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Manufacturer</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="manufacturer"
                                        value={med.manufacturer}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Price (PKR)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={med.price}
                                        onChange={(e) =>
                                            handleMedicineChange(idx, e)
                                        }
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="quantity"
                                        value={med.quantity}
                                        onChange={(e) =>
                                            handleMedicineChange(idx, e)
                                        }
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Total</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={med.total}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs="auto">
                                {medicines.length > 1 && (
                                    <Button
                                        variant="danger"
                                        onClick={() => removeMedicine(idx)}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    ))}
                    <Button
                        variant="secondary"
                        onClick={addMedicine}
                        className="mb-3"
                    >
                        Add Medicine
                    </Button>

                    <h5 className="mt-3">Grand Total (PKR): {grandTotal}</h5>

                    <Button variant="primary" type="submit" className="mt-3">
                        Create Receipt
                    </Button>
                </Form>
            </Card>
        </>
    );
};

export default SalesForm;
