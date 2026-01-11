//NoteCreation component provides a user-friendly interface for creating new notes. It uses React hooks to manage form state, handles form submission securely, and provides feedback to users. By using React Router for navigation and custom API functions for note creation, it ensures a smooth note creation process while maintaining security and user experience.

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NoteCreation({ onNoteCreated }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onNoteCreated({ title, content });
            setTitle("");
            setContent("");
        } catch (error) {
            console.error("Failed to create note", error);
        }
    };

    return (
        <div className="note-creation">
            <h2 className="section-title">Record a Memory</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        id="title"
                        className="form-input"
                        placeholder="Memory Title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <textarea
                        id="note"
                        className="form-textarea"
                        placeholder="What are you remembering distinctively?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/')} style={{ flex: 1 }}>Cancel</button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Store Memory</button>
                </div>
            </form>
        </div>
    );
}

export default NoteCreation;
