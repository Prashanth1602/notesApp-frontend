import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchNotes } from "../services/api";
import { useDebounce } from "../hooks/useDebounce";

function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();
    const debouncedSearchTerm = useDebounce(query, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            setLoading(true);
            setError(null);
            setShowResults(true);

            searchNotes(debouncedSearchTerm)
                .then((data) => {
                    let normalizedResults = [];
                    normalizedResults = data.results;
                    setResults(normalizedResults);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setResults([]);
                    setLoading(false);
                });
        } else {
            setResults([]);
            setShowResults(false);
        }
    }, [debouncedSearchTerm]);

    const handleSelectNote = (noteId) => {
        navigate(`/?noteId=${noteId}`);
        setShowResults(false);
        setQuery("");
        setResults([]);
    };

    return (
        <div className="search-container">
            <form onSubmit={(e) => e.preventDefault()} className="search-form">
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
                    {!loading && !error && results.length === 0 && query && (
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