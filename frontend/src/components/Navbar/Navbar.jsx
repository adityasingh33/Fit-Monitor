import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">FitMonitor</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* ✅ Show only if authenticated */}
                        {isAuthenticated && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/habit">Habit</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    
                    {/* ✅ Show Login/Register if NOT logged in */}
                    {!isAuthenticated ? (
                        <form className="d-flex">
                            <button className="btn btn-outline-success mx-2" onClick={() => navigate("/login")}>Login</button>
                            <button className="btn btn-outline-success mx-2" onClick={() => navigate("/register")}>Register</button>
                        </form>
                    ) : (
                        /* ✅ Show Logout if logged in */
                        <button className="btn btn-outline-danger mx-2" onClick={logout}>Logout</button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
