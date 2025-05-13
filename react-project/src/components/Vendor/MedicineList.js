import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

const MedicineList = () => {
    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/api/medicines");
            setMedicines(res.data);
        };
        fetchData();
    }, []);

    const deleteMedicine = async (id) => {
        await axios.delete(`http://localhost:5000/api/medicines/${id}`);
        setMedicines(medicines.filter((med) => med._id !== id));
    };

    return (
        <Table striped bordered hover className="mt-4">
            <thead>
                <tr>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {medicines.map((med, index) => (
                    <tr key={med._id}>
                        <td>{index + 1}</td>
                        <td>{med.name}</td>
                        <td>{med.manufacturer}</td>
                        <td>{med.price}</td>
                        <td>{med.quantity}</td>
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
                                onClick={() => deleteMedicine(med._id)}
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

export default MedicineList;
