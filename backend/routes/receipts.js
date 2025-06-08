const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname, "../data/receipts.json");

// Helper: Read receipts from JSON file
const readReceipts = () => {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
};

// Helper: Write receipts to JSON file
const writeReceipts = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// GET all receipts
router.get("/", (req, res) => {
    const receipts = readReceipts();
    res.json(receipts);
});

// POST a new receipt
router.post("/", (req, res) => {
    const receipts = readReceipts();
    const newReceipt = { ...req.body, _id: Date.now().toString() };
    receipts.push(newReceipt);
    writeReceipts(receipts);
    res.json(newReceipt);
});

// DELETE a receipt by id
router.delete("/:id", (req, res) => {
    let receipts = readReceipts();
    receipts = receipts.filter((rec) => rec._id !== req.params.id);
    writeReceipts(receipts);
    res.json({ message: "Receipt deleted" });
});

module.exports = router;
