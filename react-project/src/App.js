import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import MedicineForm from "./components/Medicine/MedicineForm";
import Home from "./components/Home";
import CustomersForm from "./components/Customer/CustomersForm";
import SalesList from "./components/Sale/SalesList";
import SalesForm from "./components/Sale/SalesForm";
import ManufacturerForm from "./components/Manufacturer/ManufacturerForm";
import VendorForm from "./components/Vendor/VendorForm";

function App() {
    return (
        <Router>
            <Navbar />
            <Container>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/new-sale" element={<SalesForm />} />
                    <Route path="/sales" element={<SalesList />} />
                    <Route path="/medicine" element={<MedicineForm />} />
                    <Route
                        path="/manufacturer"
                        element={<ManufacturerForm />}
                    />
                    <Route path="/vendor" element={<VendorForm />} />
                    <Route path="/customers" element={<CustomersForm />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
