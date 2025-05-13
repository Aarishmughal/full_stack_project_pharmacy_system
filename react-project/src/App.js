import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import MedicineForm from "./components/Medicine/MedicineForm";
import Home from "./components/Home";
import CustomersForm from "./components/Customer/CustomersForm";
import SalesForm from "./components/Sale/SalesForm";

function App() {
    return (
        <Router>
            <Navbar />
            <Container>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sales" element={<SalesForm />} />
                    <Route path="/medicine" element={<MedicineForm />} />
                    <Route path="/customers" element={<CustomersForm />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
