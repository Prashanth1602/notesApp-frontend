import { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import NoteCreation from "./components/noteCreation";
import NoteList from "./components/NoteList";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import UserProfile from "./components/UserProfile";
import { getNotes, createNote, deleteNote, updateNote, archiveNote, unarchiveNote } from "./services/api";

function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    return user ? children : <Navigate to="/login" />;
}

function Home() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = () => {
        getNotes().then(data => {
            if (data) setNotes(data);
        });
    };

    const handleCreateNote = (note) => {
        return createNote(note).then(newNote => {
            if (newNote) {
                setNotes([...notes, newNote]);
            }
        });
    };

    const handleDeleteNote = (id) => {
        deleteNote(id).then(() => {
            setNotes(notes.filter(n => n.id !== id));
        });
    };

    const handleUpdateNote = (id, updatedNote) => {
        updateNote(id, updatedNote).then(data => {
            if (data) {
                setNotes(notes.map(n => (n.id === id ? data : n)));
            }
        });
    };

    const handleToggleArchive = (id, isArchived) => {
        const action = isArchived ? unarchiveNote : archiveNote;
        action(id).then(data => {
            if (data) {
                setNotes(notes.map(n => (n.id === id ? data : n)));
            }
        });
    };

    return (
        <div className="app-container">
            <h1 className="app-title">smriti</h1>
            <NoteCreation onNoteCreated={handleCreateNote} />
            <hr className="separator" />
            <NoteList
                notes={notes}
                onDelete={handleDeleteNote}
                onUpdate={handleUpdateNote}
                onToggleArchive={handleToggleArchive}
            />
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    } />
                    <Route path="/profile" element={
                        <PrivateRoute>
                            <UserProfile />
                        </PrivateRoute>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
