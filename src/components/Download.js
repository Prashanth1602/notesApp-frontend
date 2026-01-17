
function Download({ notes }) {
    const handleDownload = () => {
        if (!notes || notes.length === 0) {
            alert("No memories to download.");
            return;
        }

        try {
            const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Memories - Smriti</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&family=Playfair+Display:wght@700&display=swap');
        
        body {
            font-family: 'Outfit', sans-serif;
            background-color: #0F172A;
            color: #F1F5F9;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            line-height: 1.6;
        }
        
        .header {
            text-align: center;
            margin-bottom: 60px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding-bottom: 40px;
        }
        
        h1 {
            font-family: 'Playfair Display', serif;
            font-size: 3rem;
            color: #F59E0B;
            margin: 0 0 10px 0;
        }
        
        .subtitle {
            color: #94A3B8;
            font-weight: 300;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .note-card {
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
        }
        
        .note-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, #F59E0B, #EC4899);
        }
        
        .note-title {
            font-size: 1.5rem;
            color: #F1F5F9;
            margin: 0 0 15px 0;
            font-weight: 600;
        }
        
        .note-meta {
            font-size: 0.85rem;
            color: #94A3B8;
            margin-bottom: 20px;
            display: flex;
            gap: 15px;
        }
        
        .note-content {
            white-space: pre-wrap;
            color: #CBD5E1;
        }
        
        .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
            background: rgba(99, 102, 241, 0.1);
            color: #818CF8;
        }
        
        .footer {
            text-align: center;
            margin-top: 60px;
            color: #64748B;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Smriti</h1>
        <div class="subtitle">The Digital Essence of Memory</div>
    </div>
    
    <div class="notes-container">
        ${notes.map(note => `
            <div class="note-card">
                <h2 class="note-title">${note.title || 'Untitled Memory'}</h2>
                <div class="note-meta">
                    <span>${new Date(note.created_at).toLocaleDateString()}</span>
                    ${note.is_archived ? '<span class="badge">ARCHIVED</span>' : ''}
                </div>
                <div class="note-content">${note.content || ''}</div>
            </div>
        `).join('')}
    </div>
    
    <div class="footer">
        Generated on ${new Date().toLocaleDateString()}
    </div>
</body>
</html>
            `;

            const htmlBlob = new Blob([htmlContent], { type: "text/html" });
            const url = window.URL.createObjectURL(htmlBlob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "memories.html");
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error generating HTML:", error);
            alert("Failed to generate download file.");
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
