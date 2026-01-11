import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchNotes } from "../services/api";

function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        setShowResults(true);
        try {
            const data = await searchNotes(query);

            let normalizedResults = [];
            data && Array.isArray(data.results) && (normalizedResults = data.results);
            setResults(normalizedResults);
        } catch (err) {
            setError(err.message);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectNote = (noteId) => {
        navigate(`/?noteId=${noteId}`);
        setShowResults(false);
        setQuery("");
        setResults([]);
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    className="search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search memories..."
                />
                <button type="submit" className="search-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </form>

            {showResults && (
                <div className="search-dropdown">
                    {loading && <div className="search-message">Searching...</div>}
                    {error && <div className="search-message error">{error}</div>}
                    {!loading && !error && results.length === 0 && (
                        <div className="search-message">No memories found.</div>
                    )}

                    {results.length > 0 && (
                        <ul className="search-results-list">
                            {results.map((result) => (
                                <li
                                    key={result.id}
                                    onClick={() => handleSelectNote(result.id)}
                                    className="search-result-item"
                                >
                                    <span className="search-result-title">{result.title || "Untitled"}</span>
                                    {result.is_archived && <span className="search-badge-archived">Archived</span>}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {showResults && <div className="search-overlay" onClick={() => setShowResults(false)}></div>}
        </div>
    );
}

export default Search;