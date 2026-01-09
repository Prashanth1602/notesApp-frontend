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
        <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <br />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <br />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <h3>{note.title} {note.is_archived && "(Archived)"}</h3>
                    <p>{note.content}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => onDelete(note.id)}>Delete</button>
                    <button onClick={() => onToggleArchive(note.id, note.is_archived)}>
                        {note.is_archived ? "Unarchive" : "Archive"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Note;