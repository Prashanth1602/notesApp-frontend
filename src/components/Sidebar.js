//Sidebar component displays a list of notes in a sidebar, allowing users to navigate between them. It takes an array of notes, a function to handle note selection, and the ID of the currently selected note. By using React's key prop and onClick events, it ensures smooth navigation and visual feedback for active notes.

function Sidebar({ notes, onSelectNote, selectedNoteId }) {
    return (
        <aside className="sidebar">
            <h2 className="sidebar-title">Memory Lane</h2>
            <div className="sidebar-list">
                {notes.length === 0 ? (
                    <p className="sidebar-empty">No memories yet.</p>
                ) : (
                    notes.map(note => (
                        <div
                            key={note.id}
                            className={`sidebar-item ${selectedNoteId === note.id ? 'active' : ''}`}
                            onClick={() => onSelectNote(note)}
                        >
                            <h3 className="sidebar-note-title">{note.title || "Untitled Memory"}</h3>
                            <span className="sidebar-date">
                                {note.created_at ? new Date(note.created_at).toLocaleDateString() : ""}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </aside>
    );
}

export default Sidebar;
