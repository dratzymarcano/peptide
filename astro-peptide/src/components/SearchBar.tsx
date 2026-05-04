import { type FormEvent, useEffect, useRef, useState } from 'react';

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  category: string;
  type: 'product' | 'blog' | 'page';
}

interface SearchBarProps {
  labels?: {
    openSearch?: string;
    searchCatalogue?: string;
    search?: string;
    closeSearch?: string;
    close?: string;
    searching?: string;
    noResults?: string;
  };
  localePrefix?: string;
  searchPath?: string;
  locale?: string;
}

const defaultLabels = {
  openSearch: 'Open search',
  searchCatalogue: 'Search catalogue',
  search: 'Search',
  closeSearch: 'Close search',
  close: 'Close',
  searching: 'Searching...',
  noResults: 'No results found for "{query}".',
};

export default function SearchBar({ labels, localePrefix = '', searchPath = '/search/', locale = 'en' }: SearchBarProps) {
  const copy = { ...defaultLabels, ...labels };
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeSearch();
      }
    }

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  useEffect(() => {
    async function runSearch() {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}&lang=${encodeURIComponent(locale)}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data.results || []);
        }
      } finally {
        setIsLoading(false);
      }
    }

    const debounce = window.setTimeout(runSearch, 300);
    return () => window.clearTimeout(debounce);
  }, [query]);

  function closeSearch() {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (query.trim()) {
      window.location.href = `${searchPath}?q=${encodeURIComponent(query.trim())}`;
    }
  }

  function localizeResultPath(path: string) {
    if (!localePrefix || !path.startsWith('/')) return path;
    return `${localePrefix}${path}`.replace(/\/+/g, '/');
  }

  return (
    <div className="search-shell" ref={containerRef}>
      {!isOpen ? (
        <button className="header-icon-btn" type="button" onClick={() => setIsOpen(true)} aria-label={copy.openSearch}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
      ) : (
        <div className="search-panel">
          <form className="search-input-row" role="search" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => event.key === 'Escape' && closeSearch()}
              placeholder={copy.searchCatalogue}
              aria-label={copy.searchCatalogue}
            />
            <button type="submit" aria-label={copy.search}>{copy.search}</button>
            <button type="button" onClick={closeSearch} aria-label={copy.closeSearch}>{copy.close}</button>
          </form>

          {(query.trim().length >= 2 || isLoading) && (
            <div className="search-results-panel" role="status">
              {isLoading ? (
                <p>{copy.searching}</p>
              ) : results.length > 0 ? (
                results.map((result) => (
                  <a className="search-result-item" href={localizeResultPath(result.slug)} key={result.id} onClick={closeSearch}>
                    <span className="search-result-icon" data-result-type={result.type} aria-hidden="true">{result.type.slice(0, 1).toUpperCase()}</span>
                    <span>
                      <strong>{result.title}</strong>
                      <small>{result.category}</small>
                    </span>
                  </a>
                ))
              ) : (
                <p>{copy.noResults.replace('{query}', query)}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}