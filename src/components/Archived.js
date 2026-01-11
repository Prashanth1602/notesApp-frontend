// Archived component displays a list of archived notes in a sidebar, allowing users to navigate between them. It takes an array of notes, a function to handle note selection, and the ID of the currently selected note. By using React's key prop and onClick events, it ensures smooth navigation and visual feedback for active notes.

function Archived({ notes, onSelectNote, selectedNoteId }) {
    if (!notes || notes.length === 0) return null;

    return (
        <div className="archived-section" style={{ marginTop: '2rem', borderTop: '1px solid var(--card-border)', paddingTop: '1rem' }}>
            <h3 className="sidebar-title" style={{ fontSize: '1.2rem', opacity: 0.8 }}>Archived</h3>
            <div className="archived-list">
                {notes.map(note => (
                    <div
                        key={note.id}
                        className={`sidebar-item archived ${selectedNoteId === note.id ? 'active' : ''}`}
                        onClick={() => onSelectNote(note)}
                        style={{ opacity: 0.7 }}
                    >
                        <h3 className="sidebar-note-title">{note.title || "Untitled Memory"}</h3>
                        <span className="sidebar-date">
                            {note.created_at ? new Date(note.created_at).toLocaleDateString() : ""}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Archived;
