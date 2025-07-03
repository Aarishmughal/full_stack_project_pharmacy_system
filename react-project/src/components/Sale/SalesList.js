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
        // Generate the HTML content directly without relying on DOM elements
        const printHTML = `
            <html>
            <head>
                <title>Receipt PDF</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        margin: 40px; 
                        line-height: 1.6;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                        border-bottom: 2px solid #333;
                        padding-bottom: 20px;
                    }
                    .customer-info {
                        margin-bottom: 30px;
                        padding: 15px;
                        background: #f8f9fa;
                        border-radius: 5px;
                    }
                    .customer-info h3 {
                        margin-top: 0;
                        color: #333;
                    }
                    .customer-info p {
                        margin: 5px 0;
                    }
                    table { 
                        width: 100%; 
                        border-collapse: collapse; 
                        margin: 20px 0;
                    }
                    th, td { 
                        border: 1px solid #333; 
                        padding: 12px 8px; 
                        text-align: left; 
                    }
                    th { 
                        background: #eee; 
                        font-weight: bold;
                    }
                    .medicines-section {
                        margin: 30px 0;
                    }
                    .medicines-section h3 {
                        color: #333;
                        border-bottom: 1px solid #ccc;
                        padding-bottom: 10px;
                    }
                    .total-section {
                        margin-top: 30px;
                        text-align: right;
                        font-size: 18px;
                        font-weight: bold;
                        background: #f8f9fa;
                        padding: 15px;
                        border-radius: 5px;
                    }
                    .footer {
                        margin-top: 50px;
                        text-align: center;
                        font-size: 12px;
                        color: #666;
                        border-top: 1px solid #ccc;
                        padding-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Sales Receipt</h1>
                    <p>Date: ${
                        receipt.date || new Date().toLocaleDateString()
                    }</p>
                </div>
                
                <div class="customer-info">
                    <h3>Customer Information</h3>
                    <p><strong>Name:</strong> ${
                        receipt.customer?.name || "N/A"
                    }</p>
                    <p><strong>Phone:</strong> ${
                        receipt.customer?.phone || "N/A"
                    }</p>
                    <p><strong>Address:</strong> ${
                        receipt.customer?.address || "N/A"
                    }</p>
                </div>
                
                <div class="medicines-section">
                    <h3>Medicines</h3>
                    <table>
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
                            ${
                                receipt.medicines
                                    ?.map(
                                        (med, idx) => `
                                <tr>
                                    <td>${idx + 1}</td>
                                    <td>${med.name || "N/A"}</td>
                                    <td>${med.manufacturer || "N/A"}</td>
                                    <td>${med.price || 0}</td>
                                    <td>${med.quantity || 0}</td>
                                    <td>${med.total || 0}</td>
                                </tr>
                            `
                                    )
                                    .join("") ||
                                '<tr><td colspan="6">No medicines found</td></tr>'
                            }
                        </tbody>
                    </table>
                </div>
                
                <div class="total-section">
                    Grand Total: ${receipt.grandTotal || 0} PKR
                </div>
                
                <div class="footer">
                    <p>Thank you for your business!</p>
                    <p>Receipt generated on ${new Date().toLocaleString()}</p>
                </div>
            </body>
            </html>
        `;

        // Open new window and print
        const printWindow = window.open("", "_blank", "width=800,height=600");
        if (!printWindow) {
            alert("Please allow popups for this website to enable printing.");
            return;
        }

        printWindow.document.open();
        printWindow.document.write(printHTML);
        printWindow.document.close();

        // Wait for content to load, then print
        printWindow.onload = () => {
            printWindow.focus();
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 500);
        };
    };

    return (
        <>
            <h1 className="text-center my-4 display-1">Old Sale Receipts</h1>
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
                        <div id="printable-receipt">
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
                        </div>
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
