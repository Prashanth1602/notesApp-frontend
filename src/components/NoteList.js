import Note from "./note";

function NoteList({ notes, onDelete, onUpdate, onToggleArchive }) {
    if (!notes || notes.length === 0) {
        return <p>No notes available.</p>;
    }

    return (
        <div>
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
