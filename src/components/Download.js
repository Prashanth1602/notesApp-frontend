import { downloadNotes } from "../services/api";
function Download() {
    const handleDownload = async () => {
        try {
            const blob = await downloadNotes();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "memories.html");
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading notes:", error);
            alert("Failed to download memories.");
        }
    };

    return (
        <button
            className="btn btn-outline sidebar-download-btn"
            onClick={handleDownload}
            title="Download all notes"
        >
            Download Memories
        </button>
    );
}

export default Download;
