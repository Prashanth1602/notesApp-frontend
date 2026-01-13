
import { useState, useEffect } from 'react';

const messages = [
    "Some moments don’t fade, they quietly move in.",
    "Happiness is remembering without hurting.",
    "Life feels lighter when a moment stays kind.",
    "Memories are proof that joy once stopped by.",
    "Hope often looks like a small, ordinary day.",
    "Not every smile was loud, but it was real.",
    "Some days become memories before we notice.",
    "A good moment never really leaves you.",
    "Life writes softly, but meaning stays bold.",
    "Happiness is a memory that still breathes.",
    "Moments matter more when they felt simple.",
    "Hope begins where yesterday still feels warm.",
    "Memories don’t age, we just understand them better.",
    "Life is a collection of gentle hellos.",
    "Some happiness is meant to be remembered, not repeated."
];

function LoadingScreen() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, []);

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(10, 10, 10, 0.8)', // Dark overlay
            backdropFilter: 'blur(12px)', // Glassmorphism
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            transition: 'opacity 0.5s ease',
            color: '#fff',
            fontFamily: "'Inter', sans-serif", // Assuming Inter or system font
        },
        container: {
            textAlign: 'center',
            maxWidth: '600px',
            padding: '2rem',
        },
        spinner: {
            width: '50px',
            height: '50px',
            border: '3px solid rgba(255, 255, 255, 0.1)',
            borderTop: '3px solid #6366f1', // Indigo accent
            borderRadius: '50%',
            animation: 'spin 1s cubic-bezier(0.76, 0.35, 0.2, 0.7) infinite',
            margin: '0 auto 2rem auto',
        },
        text: {
            fontSize: '1.5rem',
            fontWeight: '300',
            lineHeight: '1.6',
            opacity: 0,
            animation: 'fadeInUp 0.8s ease-out forwards 0.2s',
            background: 'linear-gradient(90deg, #fff, #a5b4fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        }
    };

    return (
        <div style={styles.overlay} className="loading-overlay">
            <style>
                {`
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}
            </style>
            <div style={styles.container}>
                <div style={styles.spinner}></div>
                <p style={styles.text}>{message}</p>
            </div>
        </div>
    );
}

export default LoadingScreen;
