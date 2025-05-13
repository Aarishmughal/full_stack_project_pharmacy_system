import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomersList from "./CustomersList";

const CustomersForm = () => {
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
            <h1 className="text-center mt-4 display-1">Manage Customers</h1>
            <hr />
            <div className="text-end">
                <Nav.Link as={Link} to="/">
                    <Button variant="primary" className="mt-4">
                        Create New Sale
                    </Button>
                </Nav.Link>
            </div>

            <CustomersList />
        </>
    );
};

export default CustomersForm;
