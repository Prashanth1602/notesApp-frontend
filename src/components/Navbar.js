

//Navbar component provides a user-friendly navigation interface. It uses React hooks to manage authentication state, handles navigation securely, and provides feedback to users. By using React Router for navigation and custom API functions for authentication, it ensures a smooth navigation process while maintaining security and user experience.

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Search from "./Search";

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
                <Link to="/" className="nav-logo">⏳</Link>

                {user && <Search />}

                <div className="nav-links">
                    {user ? (
                        <>
                            <span className="nav-welcome">
                                Welcome, <Link to="/profile" className="nav-user-link">{user.username}</Link>
                            </span>
                            <Link to="/create" className="btn btn-primary mr-1">Record Memory</Link>
                            <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline mr-05">Login</Link>
                            <Link to="/register" className="btn btn-primary">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
