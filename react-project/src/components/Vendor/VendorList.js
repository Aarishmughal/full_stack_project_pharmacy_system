import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

const VendorList = () => {
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/api/vendors");
            setVendors(res.data);
        };
        fetchData();
    }, []);

    const deleteVendor = async (id) => {
        await axios.delete(`http://localhost:5000/api/vendors/${id}`);
        setVendors(vendors.filter((vendor) => vendor._id !== id));
    };

    return (
        <Table striped bordered hover className="mt-4">
            <thead>
                <tr>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {vendors.map((vendor, index) => (
                    <tr key={vendor._id}>
                        <td>{index + 1}</td>
                        <td>{vendor.name}</td>
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
                                onClick={() => deleteVendor(vendor._id)}
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

export default VendorList;
