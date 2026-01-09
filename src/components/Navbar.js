import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">smriti</Link>
                <div className="nav-links">
                    {user ? (
                        <>
                            <span style={{ marginRight: '1rem', color: 'var(--text-secondary)' }}>
                                Welcome, <Link to="/profile" style={{ fontWeight: 'bold', color: 'var(--text-primary)', textDecoration: 'none' }}>{user.username}</Link>
                            </span>
                            <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline" style={{ marginRight: '0.5rem' }}>Login</Link>
                            <Link to="/register" className="btn btn-primary">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
