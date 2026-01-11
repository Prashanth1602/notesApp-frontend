

//Note component displays a single note in a card layout, allowing users to interact with it. It takes a note object, functions to handle note deletion, updates, and archiving, and renders the note's title, content, and actions. By using React's state management and onClick events, it ensures smooth interaction and visual feedback for active notes.

import { useState } from "react";

function Note({ note, onDelete, onUpdate, onToggleArchive }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const handleUpdate = () => {
        onUpdate(note.id, { title, content });
        setIsEditing(false);
    };

    return (
        <>
            <div className="note-card note-detail-view">
                <div className="note-header">
                    <h2 className="note-title">{note.title}</h2>
                    {note.is_archived && <span className="archived-badge">Archived</span>}
                </div>
                <p className="note-content">{note.content}</p>
                <div className="note-actions">
                    <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => onDelete(note.id)}>Delete</button>
                    <button className="btn btn-outline" onClick={() => onToggleArchive(note.id, note.is_archived)}>
                        {note.is_archived ? "Unarchive" : "Archive"}
                    </button>
                </div>
            </div>

            {isEditing && (
                <div className="modal-overlay" onClick={() => setIsEditing(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>Edit Memory</h2>
                        <input
                            type="text"
                            className="form-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title..."
                        />
                        <textarea
                            className="form-textarea"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="What would you like to edit?"
                        />
                        <div className="modal-actions">
                            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleUpdate}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Note;