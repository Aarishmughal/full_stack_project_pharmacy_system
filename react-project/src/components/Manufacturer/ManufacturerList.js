import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

const ManufacturerList = () => {
    const [manufacturers, setManufacturers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(
                "http://localhost:5000/api/manufacturers"
            );
            setManufacturers(res.data);
        };
        fetchData();
    }, []);

    const deleteManufacturer = async (id) => {
        await axios.delete(`http://localhost:5000/api/manufacturers/${id}`);
        setManufacturers(manufacturers.filter((man) => man._id !== id));
    };

    return (
        <Table striped bordered hover className="mt-4">
            <thead>
                <tr>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {manufacturers.map((man, index) => (
                    <tr key={man._id}>
                        <td>{index + 1}</td>
                        <td>{man.name}</td>
                        <td>{man.address}</td>
                        <td className="gap-2 d-flex justify-content-center">
                            <Button
                                variant="warning"
                                onClick={() =>
                                    alert(
                                        "Edit functionality not implemented yet"
                                    )
                                }
                            >
                                <i class="bi bi-pen-fill"></i>
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => deleteManufacturer(man._id)}
                            >
                                <i class="bi bi-trash3-fill"></i>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ManufacturerList;
