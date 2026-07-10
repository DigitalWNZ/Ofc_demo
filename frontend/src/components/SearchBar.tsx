import { useState, type FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string, semantic: boolean) => void;
  initialQuery?: string;
}

export default function SearchBar({ onSearch, initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [semantic, setSemantic] = useState(true);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      onSearch(trimmed, semantic);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <svg
          className="search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          className="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={semantic ? 'Search game data assets...' : 'e.g. entrygroup="projects/.../entryGroups/okf_demo"'}
          autoFocus
        />
      </div>
      <div className="search-mode-toggle">
        <button
          type="button"
          className={`search-mode-btn ${semantic ? 'active' : ''}`}
          onClick={() => setSemantic(true)}
        >
          Semantic
        </button>
        <button
          type="button"
          className={`search-mode-btn ${!semantic ? 'active' : ''}`}
          onClick={() => setSemantic(false)}
        >
          Syntax
        </button>
      </div>
    </form>
  );
}
