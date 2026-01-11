// App.js acts as the core controller of the application. It sets up authentication context, defines public and protected routes, fetches and manages notes, coordinates UI components like Sidebar and Note view, and ensures secure navigation across the app.

import { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import NoteCreation from "./components/noteCreation";
import Sidebar from "./components/Sidebar";
import Note from "./components/note";
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
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        getNotes().then(data => {
            if (data) {
                setNotes(data);
            }
        });
    }, []);

    const handleDeleteNote = (id) => {
        deleteNote(id).then(() => {
            const updatedNotes = notes.filter(n => n.id !== id);
            setNotes(updatedNotes);
            if (selectedNote && selectedNote.id === id) {
                setSelectedNote(null);
            }
        });
    };

    const handleUpdateNote = (id, updatedNote) => {
        updateNote(id, updatedNote).then(data => {
            if (data) {
                const updatedList = notes.map(n => (n.id === id ? data : n));
                setNotes(updatedList);
                if (selectedNote && selectedNote.id === id) {
                    setSelectedNote(data);
                }
            }
        });
    };

    const handleToggleArchive = (id, isArchived) => {
        const action = isArchived ? unarchiveNote : archiveNote;
        action(id).then(data => {
            if (data) {
                const updatedList = notes.map(n => (n.id === id ? data : n));
                setNotes(updatedList);
                if (selectedNote && selectedNote.id === id) {
                    setSelectedNote(data);
                }
            }
        });
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Smriti</h1>
            <p className="app-subtitle">The Digital Essence of Memory</p>

            <div className="app-layout">
                <Sidebar
                    notes={notes}
                    onSelectNote={setSelectedNote}
                    selectedNoteId={selectedNote ? selectedNote.id : null}
                />

                <div className="note-view-container">
                    {selectedNote ? (
                        <Note
                            key={selectedNote.id}
                            note={selectedNote}
                            onDelete={handleDeleteNote}
                            onUpdate={handleUpdateNote}
                            onToggleArchive={handleToggleArchive}
                        />
                    ) : (
                        <div className="empty-selection-state">
                            <div className="empty-selection-icon">🦋</div>
                            <h2>Select a memory to recall</h2>
                            <p>Or record a new one from the navigation bar.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function CreateNoteWrapper() {
    const navigate = useNavigate();

    const handleCreate = async (note) => {
        const newNote = await createNote(note);
        if (newNote) {
            navigate("/");
        }
    };

    return (
        <div className="app-container">
            <NoteCreation onNoteCreated={handleCreate} />
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
                    <Route path="/create" element={
                        <PrivateRoute>
                            <CreateNoteWrapper />
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
