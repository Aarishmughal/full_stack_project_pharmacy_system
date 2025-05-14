const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname, "../data/manufacturers.json");

const readManufacturers = () => {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
};
const writeManufacturers = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};
router.get("/", (req, res) => {
    const manufacturers = readManufacturers();
    res.json(manufacturers);
});
router.post("/", (req, res) => {
    const manufacturers = readManufacturers();
    const newMan = { ...req.body, _id: Date.now().toString() };
    manufacturers.push(newMan);
    writeManufacturers(manufacturers);
    res.json(newMan);
});
router.delete("/:id", (req, res) => {
    let manufacturers = readManufacturers();
    manufacturers = manufacturers.filter((man) => man._id !== req.params.id);
    writeManufacturers(manufacturers);
    res.json({ message: "Manufacturer deleted" });
});

module.exports = router;
