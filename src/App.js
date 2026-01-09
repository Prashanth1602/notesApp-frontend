import { useState, useEffect } from "react";
import NoteCreation from "./components/noteCreation";
import NoteList from "./components/NoteList";
import { getNotes, createNote, deleteNote, updateNote, archiveNote, unarchiveNote } from "./services/api";

function App() {
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
            <h1 className="app-title">smiriti - A second memory</h1>
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

export default App;
