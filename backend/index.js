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
const receiptsRouter = require("./routes/receipts");
const customersRouter = require("./routes/customers");

app.use("/api/medicines", medicinesRouter);
app.use("/api/manufacturers", manufacturersRouter);
app.use("/api/vendors", vendorsRouter);
app.use("/api/receipts", receiptsRouter);
app.use("/api/customers", customersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
