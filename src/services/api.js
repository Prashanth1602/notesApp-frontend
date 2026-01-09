const API_URL = "https://notesapp-gqeu.onrender.com";

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }),
    };
};

const handleResponse = async (response) => {
    if (response.ok) {
        return response.json();
    }

    if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject("Session expired. Please login again.");
    }

    try {
        const errorData = await response.json();
        const errorMessage = errorData.detail || errorData.message || "An unexpected error occurred";
        return Promise.reject(errorMessage);
    } catch (e) {
        return Promise.reject(response.statusText || "An unexpected error occurred");
    }
};

export const login = (email, password) => {
    return fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    }).then(handleResponse);
};

export const register = (username, email, password) => {
    return fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    }).then(handleResponse);
};

export const logout = () => {
    return fetch(`${API_URL}/users/logout`, {
        method: "POST",
        headers: getHeaders(),
    }).then(() => {
        localStorage.removeItem("token");
    });
};

export const getCurrentUser = () => {
    return fetch(`${API_URL}/users/me`, {
        headers: getHeaders(),
    }).then(handleResponse);
};

export const updateUser = (username, email) => {
    return fetch(`${API_URL}/users/me`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ username, email }),
    }).then(handleResponse);
};

export const deleteUser = () => {
    return fetch(`${API_URL}/users/me`, {
        method: "DELETE",
        headers: getHeaders(),
    }).then(handleResponse);
};

export const getNotes = () => {
    return fetch(`${API_URL}/notes`, {
        headers: getHeaders(),
    })
        .then(handleResponse)
        .catch(error => console.error(error));
};

export const createNote = (note) => {
    return fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(note),
    })
        .then(handleResponse)
        .catch(error => console.error(error));
};

export const deleteNote = (id) => {
    return fetch(`${API_URL}/notes/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
    })
        .then(handleResponse)
        .catch(error => console.error(error));
};

export const updateNote = (id, note) => {
    return fetch(`${API_URL}/notes/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(note),
    })
        .then(handleResponse)
        .catch(error => console.error(error));
};

export const getNoteById = (id) => {
    return fetch(`${API_URL}/notes/${id}`, {
        headers: getHeaders(),
    })
        .then(handleResponse)
        .catch(error => console.error(error));
};

export const archiveNote = (id) => {
    return fetch(`${API_URL}/notes/${id}/archive`, {
        method: "PUT",
        headers: getHeaders(),
    })
        .then(handleResponse)
        .catch(error => console.error(error));
};

export const unarchiveNote = (id) => {
    return fetch(`${API_URL}/notes/${id}/unarchive`, {
        method: "PUT",
        headers: getHeaders(),
    })
        .then(handleResponse)
        .catch(error => console.error(error));
};
