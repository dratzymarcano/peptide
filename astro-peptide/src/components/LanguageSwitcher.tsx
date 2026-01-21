import { useState, useRef, useEffect } from 'react';
import { languages, type SupportedLanguage, getLocalizedPath } from '../i18n/translations';

interface LanguageSwitcherProps {
  currentLang?: SupportedLanguage;
}

const FlagIcon = ({ lang }: { lang: string }) => {
  switch (lang) {
    case 'en':
      return (
        <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
          <path fill="#012169" d="M0 0h640v480H0z"/>
          <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
          <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176-26 35L0 47V0z"/>
          <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
          <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
        </svg>
      );
    case 'nl':
      return (
        <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
          <path fill="#21468B" d="M0 0h640v480H0z"/>
          <path fill="#FFF" d="M0 0h640v320H0z"/>
          <path fill="#AE1C28" d="M0 0h640v160H0z"/>
        </svg>
      );
    case 'de':
      return (
        <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
          <path fill="#FFCE00" d="M0 0h640v480H0z"/>
          <path fill="#000" d="M0 0h640v160H0z"/>
          <path fill="#DD0000" d="M0 160h640v160H0z"/>
        </svg>
      );
    case 'fr':
      return (
        <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
          <path fill="#EF4135" d="M0 0h640v480H0z"/>
          <path fill="#FFF" d="M0 0h427v480H0z"/>
          <path fill="#0055A4" d="M0 0h213v480H0z"/>
        </svg>
      );
    case 'es':
      return (
        <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
          <path fill="#AA151B" d="M0 0h640v480H0z"/>
          <path fill="#F1BF00" d="M0 120h640v240H0z"/>
        </svg>
      );
    case 'it':
      return (
        <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
          <path fill="#CE2B37" d="M0 0h640v480H0z"/>
          <path fill="#FFF" d="M0 0h427v480H0z"/>
          <path fill="#009246" d="M0 0h213v480H0z"/>
        </svg>
      );    case 'ru':
      return (
        <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
          <path fill="#FFF" d="M0 0h640v480H0z"/>
          <path fill="#0039A6" d="M0 160h640v160H0z"/>
          <path fill="#D52B1E" d="M0 320h640v160H0z"/>
        </svg>
      );    default:
      return null;
  }
};

export default function LanguageSwitcher({ currentLang = 'en' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: string) => {
    setIsOpen(false);
    // Use window.location to capture current path and query parameters dynamically on the client
    const currentPathWithQuery = window.location.pathname + window.location.search;
    const newPath = getLocalizedPath(currentPathWithQuery, lang as SupportedLanguage);
    window.location.href = newPath;
  };

  const getLanguageName = (code: string) => {
    return languages[code as SupportedLanguage] || code.toUpperCase();
  };

  return (
    <div className="relative font-sans text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
        className={`group flex items-center gap-2 pl-2 pr-3 py-2 rounded-full border transition-all duration-300 ease-out
          ${isOpen 
            ? 'bg-white border-blue-200 shadow-md ring-2 ring-blue-100/50' 
            : 'bg-white/80 border-slate-200 hover:border-blue-200 hover:bg-white hover:shadow-sm'
          }`}
      >
        {/* Current Flag Container */}
        <div className="relative w-6 h-6 rounded-full overflow-hidden shadow-sm shrink-0 ring-1 ring-slate-100 group-hover:ring-slate-200 transition-shadow">
          <FlagIcon lang={currentLang} />
        </div>
        
        {/* Language Code */}
        <span className="text-sm font-semibold text-slate-700 tracking-wide uppercase">
          {currentLang}
        </span>

        {/* Chevron */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-slate-400 group-hover:text-blue-500 transition-all duration-300 ${isOpen ? 'rotate-180 text-blue-500' : ''}`}
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      {/* Styled Dropdown */}
      <div
        className={`absolute top-[calc(100%+8px)] right-0 w-64 p-2 
          bg-white/95 backdrop-blur-xl border border-white/20
          rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] 
          origin-top-right transition-all duration-200 ease-out z-50
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0 visible' 
            : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
          }`}
      >
        <div className="flex flex-col gap-1">
          <div className="px-3 py-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
            Select Language
          </div>
          
          {(Object.keys(languages) as SupportedLanguage[]).map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`flex items-center gap-3 w-full p-2.5 rounded-xl text-left transition-all duration-200 group relative overflow-hidden
                ${lang === currentLang 
                  ? 'bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-100' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              {/* Flag */}
              <div className={`w-8 h-6 rounded overflow-hidden shadow-sm relative shrink-0 transition-transform duration-300 group-hover:scale-105
                 ${lang === currentLang ? 'ring-2 ring-white' : 'ring-1 ring-slate-100 opacity-80 group-hover:opacity-100'}`}>
                <FlagIcon lang={lang} />
              </div>
              
              {/* Language Name */}
              <span className="flex-1 relative z-10">
                {getLanguageName(lang)}
              </span>

              {/* Active Checkmark */}
              {lang === currentLang && (
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-blue-600"
                  >
                    <path 
                      d="M10 3L4.5 8.5L2 6" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
