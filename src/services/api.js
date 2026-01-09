const API_URL = "https://notesapp-gqeu.onrender.com";

export const getNotes = () => {
    return fetch(`${API_URL}/notes`)
        .then(response => response.json())
        .catch(error => console.error(error));
};

export const createNote = (note) => {
    return fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    })
        .then(response => response.json())
        .catch(error => console.error(error));
};

export const deleteNote = (id) => {
    return fetch(`${API_URL}/notes/${id}`, {
        method: "DELETE",
    })
        .then(response => response.json())
        .catch(error => console.error(error));
};

export const updateNote = (id, note) => {
    return fetch(`${API_URL}/notes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    })
        .then(response => response.json())
        .catch(error => console.error(error));
};

export const getNoteById = (id) => {
    return fetch(`${API_URL}/notes/${id}`)
        .then(response => response.json())
        .catch(error => console.error(error));
};

export const archiveNote = (id) => {
    return fetch(`${API_URL}/notes/${id}/archive`, {
        method: "PUT",
    })
        .then(response => response.json())
        .catch(error => console.error(error));
};

export const unarchiveNote = (id) => {
    return fetch(`${API_URL}/notes/${id}/unarchive`, {
        method: "PUT",
    })
        .then(response => response.json())
        .catch(error => console.error(error));
};

