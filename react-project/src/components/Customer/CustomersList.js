import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

const CustomersList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/api/customers");
            setCustomers(res.data);
        };
        fetchData();
    }, []);

    const deleteCustomer = async (id) => {
        await axios.delete(`http://localhost:5000/api/customers/${id}`);
        setCustomers(customers.filter((c) => c._id !== id));
    };

    return (
        <Table striped bordered hover className="mt-4">
            <thead>
                <tr>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((c, index) => (
                    <tr key={c._id}>
                        <td>{index + 1}</td>
                        <td>{c.name}</td>
                        <td>{c.phone}</td>
                        <td>{c.address}</td>
                        <td className="gap-2 d-flex justify-content-center">
                            <Button
                                variant="danger"
                                onClick={() => deleteCustomer(c._id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default CustomersList;
