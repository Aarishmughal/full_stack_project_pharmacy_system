const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname, "../data/medicines.json");

// Helper: Read medicines from JSON file
const readMedicines = () => {
	const data = fs.readFileSync(filePath, "utf8");
	return JSON.parse(data);
};

// Helper: Write medicines to JSON file
const writeMedicines = (data) => {
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// GET all medicines
router.get("/", (req, res) => {
	const medicines = readMedicines();
	res.json(medicines);
});

// POST a new medicine
router.post("/", (req, res) => {
	const medicines = readMedicines();
	const newMed = { ...req.body, _id: Date.now().toString() };
	medicines.push(newMed);
	writeMedicines(medicines);
	res.json(newMed);
});

// DELETE a medicine by id
router.delete("/:id", (req, res) => {
	let medicines = readMedicines();
	medicines = medicines.filter((med) => med._id !== req.params.id);
	writeMedicines(medicines);
	res.json({ message: "Medicine deleted" });
});

module.exports = router;
