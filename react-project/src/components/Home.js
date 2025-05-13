import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: "80vh" }}
            >
                <div className="d-flex flex-wrap gap-3 justify-content-center">
                    <Link to="/sales" className="text-decoration-none">
                        <div
                            className="card bg-success text-white"
                            style={{ width: "300px" }}
                        >
                            <div className="card-body text-center">
                                <h1>
                                    <i
                                        className="bi bi-receipt-cutoff m-0"
                                        style={{ fontSize: "100px" }}
                                    ></i>
                                </h1>
                                <h1 className="display-6 fst-italic">
                                    Generate Sale Receipt
                                </h1>
                            </div>
                        </div>
                    </Link>
                    <Link to="/sales" className="text-decoration-none">
                        <div
                            className="card bg-danger text-white"
                            style={{ width: "300px" }}
                        >
                            <div className="card-body text-center">
                                <h1>
                                    <i
                                        className="bi bi-receipt-cutoff m-0"
                                        style={{ fontSize: "100px" }}
                                    ></i>
                                </h1>
                                <h1 className="display-6 fst-italic">
                                    Manage Sale Receipts
                                </h1>
                            </div>
                        </div>
                    </Link>
                    <Link to="/medicine" className="text-decoration-none">
                        <div
                            className="card bg-primary text-white"
                            style={{ width: "300px" }}
                        >
                            <div className="card-body text-center">
                                <h1>
                                    <i
                                        className="bi bi-capsule m-0"
                                        style={{ fontSize: "100px" }}
                                    ></i>
                                </h1>
                                <h1 className="display-6 fst-italic">
                                    Manage Medicine
                                </h1>
                            </div>
                        </div>
                    </Link>
                    <Link to="/medicine" className="text-decoration-none">
                        <div
                            className="card bg-info"
                            style={{ width: "300px" }}
                        >
                            <div className="card-body text-center">
                                <h1>
                                    <i
                                        className="bi bi-person-lines-fill m-0"
                                        style={{ fontSize: "100px" }}
                                    ></i>
                                </h1>
                                <h1 className="display-6 fst-italic">
                                    Manage Manufacturers
                                </h1>
                            </div>
                        </div>
                    </Link>
                    <Link to="/medicine" className="text-decoration-none">
                        <div
                            className="card bg-primary text-white"
                            style={{ width: "300px" }}
                        >
                            <div className="card-body text-center">
                                <h1>
                                    <i
                                        className="bi bi-archive-fill m-0"
                                        style={{ fontSize: "100px" }}
                                    ></i>
                                </h1>
                                <h1 className="display-6 fst-italic">
                                    Manage Vendors
                                </h1>
                            </div>
                        </div>
                    </Link>
                    <Link to="/customers" className="text-decoration-none">
                        <div
                            className="card bg-warning"
                            style={{ width: "300px" }}
                        >
                            <div className="card-body text-center">
                                <h1>
                                    <i
                                        className="bi bi-person-fill m-0"
                                        style={{ fontSize: "100px" }}
                                    ></i>
                                </h1>
                                <h1 className="display-6 fst-italic">
                                    Manage Customers
                                </h1>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Home;
