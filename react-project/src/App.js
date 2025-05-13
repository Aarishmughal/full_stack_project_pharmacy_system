import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import MedicineForm from "./components/Medicine/MedicineForm";
import Home from "./components/Home";

function App() {
	return (
		<Router>
			<Navbar />
			<Container>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/medicine" element={<MedicineForm />} />
					{/* <Route path="/list" element={<MedicineList />} /> */}
				</Routes>
			</Container>
		</Router>
	);
}

export default App;
