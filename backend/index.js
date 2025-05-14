const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const medicinesRouter = require("./routes/medicines");
const manufacturersRouter = require("./routes/manufacturers");
const vendorsRouter = require("./routes/vendors");

app.use("/api/medicines", medicinesRouter);
app.use("/api/manufacturers", manufacturersRouter);
app.use("/api/vendors", vendorsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
