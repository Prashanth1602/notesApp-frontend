
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
