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
        <div className="note-card">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        className="form-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <br />
                    <textarea
                        className="form-textarea"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ marginTop: '0.5rem' }}
                    />
                    <div className="note-edit-actions">
                        <button className="btn btn-primary" onClick={handleUpdate}>Save</button>
                        <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="note-header">
                        <h3 className="note-title">{note.title}</h3>
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
                </>
            )}
        </div>
    );
}

export default Note;