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
        <div>
            <h2>Create Note</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter your title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="note">Note</label>
                    <input
                        type="text"
                        id="note"
                        placeholder="Enter your note"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button type="submit">Add Note</button>
            </form>
        </div>
    );
}

export default NoteCreation;
