const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname, "../data/vendors.json");

// Helper: Read medicines from JSON file
const readVendors = () => {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
};

// Helper: Write medicines to JSON file
const writeVendors = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// GET all medicines
router.get("/", (req, res) => {
    const vendors = readVendors();
    res.json(vendors);
});

// POST a new medicine
router.post("/", (req, res) => {
    const vendors = readVendors();
    const newVendor = { ...req.body, _id: Date.now().toString() };
    vendors.push(newVendor);
    writeVendors(vendors);
    res.json(newVendor);
});

// DELETE a medicine by id
router.delete("/:id", (req, res) => {
    let vendors = readVendors();
    vendors = vendors.filter((med) => med._id !== req.params.id);
    writeVendors(vendors);
    res.json({ message: "Medicine deleted" });
});

module.exports = router;