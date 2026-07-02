import { useState, useCallback } from 'react';
import type { SearchResult, ContextResponse } from './types';
import { searchCatalog, getContext } from './utils/api';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import ContextDetail from './components/ContextDetail';
import { SearchSkeleton, ContextSkeleton } from './components/LoadingState';
import ErrorToast from './components/ErrorToast';

const suggestedQueries = [
  'player retention analysis',
  'in-app purchase revenue',
  'level completion funnel',
  'user acquisition channels',
  'churn prediction',
  'daily active users',
];

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<SearchResult | null>(null);
  const [context, setContext] = useState<ContextResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingContext, setIsLoadingContext] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (searchQuery: string) => {
    setQuery(searchQuery);
    setIsSearching(true);
    setError(null);
    setHasSearched(true);
    setSelectedEntry(null);
    setContext(null);

    try {
      const data = await searchCatalog(searchQuery);
      setResults(data.results);
    } catch {
      setError('Search failed. Please try again.');
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleSelectResult = useCallback(async (result: SearchResult) => {
    setSelectedEntry(result);
    setIsLoadingContext(true);
    setError(null);

    try {
      const data = await getContext(result.entry_name);
      setContext(data);
    } catch {
      setError('Failed to load entry details.');
      setSelectedEntry(null);
    } finally {
      setIsLoadingContext(false);
    }
  }, []);

  const handleCloseContext = useCallback(() => {
    setSelectedEntry(null);
    setContext(null);
    setIsLoadingContext(false);
  }, []);

  const handleDismissError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <div className="app">
      {/* Top Bar */}
      <header className="top-bar">
        <div className="top-bar-brand">
          <svg className="top-bar-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.58 16.09l-1.09-7.66C20.21 6.46 18.52 5 16.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19h0c.68 0 1.32-.27 1.8-.75L9 16h6l2.25 2.25c.48.48 1.13.75 1.8.75h0c1.55 0 2.74-1.37 2.53-2.91zM11 11H9v2H8v-2H6v-1h2V8h1v2h2v1zm4 2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
          </svg>
          <span className="top-bar-title">Game Analytics Catalog</span>
        </div>
      </header>

      {/* Search Area */}
      <div className="search-area">
        <SearchBar
          onSearch={handleSearch}
          initialQuery={query}
        />
        {hasSearched && (
          <span className="search-subtitle">Natural language search results</span>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="results-panel">
          {!hasSearched && (
            <div className="hero-section">
              <svg
                className="hero-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21.58 16.09l-1.09-7.66C20.21 6.46 18.52 5 16.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19h0c.68 0 1.32-.27 1.8-.75L9 16h6l2.25 2.25c.48.48 1.13.75 1.8.75h0c1.55 0 2.74-1.37 2.53-2.91zM11 11H9v2H8v-2H6v-1h2V8h1v2h2v1zm4 2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
              </svg>
              <h1 className="hero-title">Game Analytics Data Catalog</h1>
              <p className="hero-subtitle">
                Discover and understand your game data assets with natural language search
              </p>
              <p className="hero-stats">
                17 tables &middot; 4 data layers &middot; Powered by Dataplex Knowledge Catalog
              </p>
              <div className="suggestion-chips">
                {suggestedQueries.map((sq) => (
                  <button
                    key={sq}
                    className="suggestion-chip"
                    onClick={() => handleSearch(sq)}
                  >
                    {sq}
                  </button>
                ))}
              </div>
            </div>
          )}

          {hasSearched && isSearching && <SearchSkeleton />}

          {hasSearched && !isSearching && (
            <ResultsList
              results={results}
              query={query}
              onSelectResult={handleSelectResult}
            />
          )}
        </div>

        {/* Context Detail Panel */}
        {selectedEntry && isLoadingContext && <ContextSkeleton />}
        {selectedEntry && context && !isLoadingContext && (
          <ContextDetail context={context} onClose={handleCloseContext} />
        )}
      </div>

      {/* Error Toast */}
      {error && <ErrorToast message={error} onDismiss={handleDismissError} />}
    </div>
  );
}
