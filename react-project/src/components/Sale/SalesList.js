import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import axios from "axios";

const SalesList = () => {
    const [receipts, setReceipts] = useState([]);
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/api/receipts");
            setReceipts(res.data);
        };
        fetchData();
    }, []);

    const handleRowClick = (receipt) => {
        setSelectedReceipt(receipt);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedReceipt(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this receipt?"))
            return;
        await axios.delete(`http://localhost:5000/api/receipts/${id}`);
        setReceipts(receipts.filter((rec) => rec._id !== id));
        if (selectedReceipt && selectedReceipt._id === id) {
            setShowModal(false);
            setSelectedReceipt(null);
        }
    };

    const handlePrint = (receipt) => {
        setSelectedReceipt(receipt);
        setShowModal(true);
        setTimeout(() => {
            const printContents = document.getElementById("printable-receipt");
            if (!printContents) return;
            const html = `
            <html>
            <head>
                <title>Receipt PDF</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid #333; padding: 8px; text-align: left; }
                    th { background: #eee; }
                    h5 { margin-top: 24px; }
                </style>
            </head>
            <body>${printContents.outerHTML}</body>
            </html>
        `;
            const printWindow = window.open(
                "",
                "_blank",
                "width=800,height=600"
            );
            if (!printWindow) return;
            printWindow.document.open();
            printWindow.document.write(html);
            printWindow.document.close();
            printWindow.focus();
            printWindow.onload = () => {
                printWindow.print();
                printWindow.close();
            };
        }, 300);
    };

    return (
        <>
            <h1 className="text-center my-4 display-1">
                Old Sale Receipts
            </h1>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Sr.</th>
                        <th>Customer Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Grand Total (PKR)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {receipts.map((rec, index) => (
                        <tr
                            key={rec._id}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleRowClick(rec)}
                        >
                            <td>{index + 1}</td>
                            <td>{rec.customer?.name}</td>
                            <td>{rec.customer?.phone}</td>
                            <td>{rec.customer?.address}</td>
                            <td>{rec.grandTotal}</td>
                            <td className="gap-2 d-flex justify-content-center">
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(rec._id);
                                    }}
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="success"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePrint(rec);
                                    }}
                                >
                                    Print PDF
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Receipt Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedReceipt && (
                        <>
                            <h5>Customer Information</h5>
                            <p>
                                <b>Name:</b> {selectedReceipt.customer?.name}
                            </p>
                            <p>
                                <b>Phone:</b> {selectedReceipt.customer?.phone}
                            </p>
                            <p>
                                <b>Address:</b>{" "}
                                {selectedReceipt.customer?.address}
                            </p>
                            <p>
                                <b>Date:</b>{" "}
                                {selectedReceipt.date
                                    ? selectedReceipt.date
                                    : "N/A"}
                            </p>
                            <h5 className="mt-4">Medicines</h5>
                            <Table bordered size="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Manufacturer</th>
                                        <th>Price (PKR)</th>
                                        <th>Quantity</th>
                                        <th>Total (PKR)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedReceipt.medicines?.map(
                                        (med, idx) => (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>{med.name}</td>
                                                <td>{med.manufacturer}</td>
                                                <td>{med.price}</td>
                                                <td>{med.quantity}</td>
                                                <td>{med.total}</td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </Table>
                            <h5 className="mt-3">
                                Grand Total (PKR): {selectedReceipt.grandTotal}
                            </h5>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SalesList;
