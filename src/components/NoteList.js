//NoteList component displays a list of notes in a grid layout, allowing users to navigate between them. It takes an array of notes, functions to handle note deletion, updates, and archiving, and renders each note using the Note component. By using React's key prop and onClick events, it ensures smooth navigation and visual feedback for active notes.

import Note from "./note";

function NoteList({ notes, onDelete, onUpdate, onToggleArchive }) {
    if (!notes || notes.length === 0) {
        return <p>No notes available.</p>;
    }

    return (
        <div className="note-list">
            {notes.map(note => (
                <Note
                    key={note.id}
                    note={note}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    onToggleArchive={onToggleArchive}
                />
            ))}
        </div>
    );
}

export default NoteList;
