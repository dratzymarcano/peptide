import { useState, useRef, useEffect } from 'react';
import { t, type SupportedLanguage } from '../i18n/translations';

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  category: string;
  type: 'product' | 'blog' | 'page';
}

interface SearchBarProps {
  lang?: SupportedLanguage;
}

export default function SearchBar({ lang = 'en' }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery('');
        setResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchProducts = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data.results || []);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
      setResults([]);
    }
  };

  return (
    <div ref={containerRef} className="position-relative">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-link text-dark p-0"
          style={{ 
            textDecoration: 'none',
            minWidth: '48px',
            minHeight: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label={t(lang, 'common.searchLabel')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </button>
      ) : (
        <div className="search-container" style={{ minWidth: '280px' }}>
          <div className="input-group">
            <input
              ref={inputRef}
              type="text"
              className="form-control form-control-sm"
              placeholder={t(lang, 'nav.search')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ 
                borderRadius: '20px 0 0 20px',
                paddingLeft: '15px'
              }}
            />
            <div className="input-group-append">
              <button 
                className="btn btn-sm btn-light"
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                  setResults([]);
                }}
                style={{ borderRadius: '0 20px 20px 0' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          {(results.length > 0 || isLoading) && (
            <div 
              className="search-results bg-white shadow rounded mt-2"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 1000,
                maxHeight: '300px',
                overflowY: 'auto'
              }}
            >
              {isLoading ? (
                <div className="p-3 text-center text-muted">
                  <small>{t(lang, 'common.searching')}</small>
                </div>
              ) : (
                results.map((result) => (
                  <a
                    key={result.id}
                    href={result.slug}
                    className="d-flex align-items-center p-2 px-3 text-dark border-bottom search-result-item"
                    style={{ textDecoration: 'none', gap: '10px' }}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery('');
                      setResults([]);
                    }}
                  >
                    <div style={{ 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: result.type === 'product' ? '#0077b6' : result.type === 'blog' ? '#059669' : '#6366f1',
                      color: 'white',
                      flexShrink: 0
                    }}>
                      {result.type === 'product' && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                          <line x1="3" y1="6" x2="21" y2="6"></line>
                          <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                      )}
                      {result.type === 'blog' && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                        </svg>
                      )}
                      {result.type === 'page' && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                      )}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{result.title}</div>
                      <small className="text-muted" style={{ textTransform: 'capitalize' }}>{result.category}</small>
                    </div>
                  </a>
                ))
              )}
            </div>
          )}

          {query.length >= 2 && !isLoading && results.length === 0 && (
            <div 
              className="search-results bg-white shadow rounded mt-2 p-3"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 1000
              }}
            >
              <div className="text-center text-muted">
                <small>{t(lang, 'common.noResultsFound').replace('{query}', query)}</small>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
