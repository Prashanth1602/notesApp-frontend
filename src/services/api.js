// api.js acts as the centralized API service layer with smart token management.
// It stores the access token in memory (not localStorage) and handles automatic token refreshing using HttpOnly cookies.

const API_URL = process.env.REACT_APP_API_URL;

let accessToken = null;

export const setAccessToken = (token) => {
    accessToken = token;
};

export const getAccessToken = () => accessToken;

const getHeaders = (options = {}) => {
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return headers;
};

const processResponse = async (response) => {
    if (response.ok) {
        if (response.status === 204) return null;
        try {
            return await response.json();
        } catch (e) {
            return null;
        }
    }

    let errorMessage = "An unexpected error occurred";
    try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.message || errorMessage;
    } catch (e) {
        errorMessage = response.statusText || errorMessage;
    }

    return Promise.reject({ status: response.status, message: errorMessage });
};

const refreshAccessToken = async () => {
    try {
        const response = await fetch(`${API_URL}/users/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        if (response.ok) {
            const data = await response.json();
            setAccessToken(data.access_token);
            return data.access_token;
        } else {
            throw new Error("Refresh failed");
        }
    } catch (error) {
        setAccessToken(null);
        throw error;
    }
};

const fetchWithAuth = async (endpoint, options = {}) => {
    const url = `${API_URL}${endpoint}`;
    const headers = getHeaders(options);

    const config = {
        ...options,
        headers,
        credentials: "include",
    };

    try {
        const response = await fetch(url, config);

        if (response.status === 401) {
            try {
                const newToken = await refreshAccessToken();
                const retryConfig = {
                    ...config,
                    headers: {
                        ...config.headers,
                        Authorization: `Bearer ${newToken}`,
                    },
                };
                const retryResponse = await fetch(url, retryConfig);
                return processResponse(retryResponse);
            } catch (refreshError) {
                return Promise.reject({ status: 401, message: "Session expired" });
            }
        }

        return processResponse(response);
    } catch (error) {
        return Promise.reject(error);
    }
};

// --- Auth Endpoints ---

export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        const data = await response.json();
        if (data.access_token) {
            setAccessToken(data.access_token);
        }
        return data;
    } else {
        return processResponse(response);
    }
};

export const register = (username, email, password) => {
    return fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    }).then(processResponse);
};

export const logout = async () => {
    try {
        await fetchWithAuth(`/users/logout`, {
            method: "POST",
        });
    } finally {
        setAccessToken(null);
    }
};

export const getCurrentUser = () => {
    return fetchWithAuth(`/users/me`);
};

export const updateUser = (username, email) => {
    return fetchWithAuth(`/users/me`, {
        method: "PUT",
        body: JSON.stringify({ username, email }),
    });
};

export const deleteUser = () => {
    return fetchWithAuth(`/users/me`, {
        method: "DELETE",
    });
};

// --- Note Endpoints ---

export const getNotes = () => {
    return fetchWithAuth(`/notes`);
};

export const createNote = (note) => {
    return fetchWithAuth(`/notes`, {
        method: "POST",
        body: JSON.stringify(note),
    });
};

export const deleteNote = (id) => {
    return fetchWithAuth(`/notes/${id}`, {
        method: "DELETE",
    });
};

export const updateNote = (id, note) => {
    return fetchWithAuth(`/notes/${id}`, {
        method: "PUT",
        body: JSON.stringify(note),
    });
};

export const getNoteById = (id) => {
    return fetchWithAuth(`/notes/${id}`);
};

export const archiveNote = (id) => {
    return fetchWithAuth(`/notes/${id}/archive`, {
        method: "PUT",
    });
};

export const unarchiveNote = (id) => {
    return fetchWithAuth(`/notes/${id}/unarchive`, {
        method: "PUT",
    });
};

export const searchNotes = (query) => {
    return fetchWithAuth(`/search?query=${query}`);
};