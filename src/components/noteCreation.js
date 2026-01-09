import { useState } from "react";

function NoteCreation({ onNoteCreated }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

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
            <h2 className="section-title">Create Note</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="form-input"
                        placeholder="Enter your title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="note">Note</label>
                    <textarea
                        id="note"
                        className="form-textarea"
                        placeholder="Enter your note"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Note</button>
            </form>
        </div>
    );
}

export default NoteCreation;
