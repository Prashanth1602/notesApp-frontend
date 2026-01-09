import { createContext, useState, useEffect } from "react";
import { login as loginService, logout as logoutService, getCurrentUser } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const userData = await getCurrentUser();
                    setUser({ ...userData, token });
                } catch (error) {
                    console.error("Failed to fetch user", error);
                    localStorage.removeItem("token");
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    const login = async (email, password) => {
        try {
            const data = await loginService(email, password);
            localStorage.setItem("token", data.access_token);
            const userData = await getCurrentUser();
            setUser({ ...userData, token: data.access_token });
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutService();
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
            setUser(null);
        }
    };

    const refreshUser = async () => {
        try {
            const userData = await getCurrentUser();
            const token = localStorage.getItem("token");
            if (token) {
                setUser({ ...userData, token });
            }
        } catch (error) {
            console.error("Failed to refresh user", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, refreshUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
