//UserProfile component provides a secure and user-friendly account management interface. It synchronizes global authentication data into local form state, allows authenticated users to update their profile information, safely handles account deletion with confirmation, refreshes global auth state after updates, and manages navigation and UI feedback. By cleanly separating local form state, global auth state, and backend interactions


import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { updateUser, deleteUser } from "../services/api";

function UserProfile() {
    const { user, logout, refreshUser } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setUsername(user.username || "");
            setEmail(user.email || "");
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        try {
            await updateUser(username, email);
            await refreshUser();
            setMessage("Profile updated successfully!");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (err) {
            setError(typeof err === 'string' ? err : "Failed to update profile.");
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                await deleteUser();
                await logout();
            } catch (err) {
                setError(typeof err === 'string' ? err : "Failed to delete account.");
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Never";
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">My Profile</h2>
                {user && user.updated_at && (
                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.875rem' }}>
                        Last Updated: {formatDate(user.updated_at)}
                    </p>
                )}
                {message && <div style={{ color: 'var(--success-color)', marginBottom: '1rem', textAlign: 'center' }}>{message}</div>}
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            className="form-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
                        Update Profile
                    </button>
                </form>
                <hr style={{ margin: '1.5rem 0', borderColor: 'var(--border-color)' }} />
                <button onClick={handleDelete} className="btn btn-danger" style={{ width: '100%' }}>
                    Delete Account
                </button>
            </div>
        </div>
    );
}

export default UserProfile;
