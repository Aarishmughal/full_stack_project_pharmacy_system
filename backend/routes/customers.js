const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname, "../data/customers.json");

// Helper: Read customers from JSON file
const readCustomers = () => {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
};

// Helper: Write customers to JSON file
const writeCustomers = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// GET all customers
router.get("/", (req, res) => {
    const customers = readCustomers();
    res.json(customers);
});

// POST a new customer
router.post("/", (req, res) => {
    const customers = readCustomers();
    const newCustomer = { ...req.body, _id: Date.now().toString() };
    customers.push(newCustomer);
    writeCustomers(customers);
    res.json(newCustomer);
});

// DELETE a customer by id
router.delete("/:id", (req, res) => {
    let customers = readCustomers();
    customers = customers.filter((c) => c._id !== req.params.id);
    writeCustomers(customers);
    res.json({ message: "Customer deleted" });
});

module.exports = router;
