import { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { currentUser, isAuthenticated, logout, loginWithGoogle, loginWithFacebook } from '../store/authStore';
import { t, type SupportedLanguage } from '../i18n/translations';

interface AccountButtonProps {
  lang?: SupportedLanguage;
}

export default function AccountButton({ lang = 'en' }: AccountButtonProps) {
  const $currentUser = useStore(currentUser);
  const $isAuthenticated = useStore(isAuthenticated);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#1e293b',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    position: 'relative'
  };

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    right: '0',
    marginTop: '8px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
    border: '1px solid #e2e8f0',
    minWidth: '200px',
    padding: '8px',
    zIndex: 1000,
    opacity: isDropdownOpen ? 1 : 0,
    visibility: isDropdownOpen ? 'visible' : 'hidden',
    transform: isDropdownOpen ? 'translateY(0)' : 'translateY(-10px)',
    transition: 'all 0.2s ease'
  };

  const dropdownLinkStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 14px',
    color: '#1e293b',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  };

  // If authenticated, show username with link to dashboard
  if ($isAuthenticated && $currentUser) {
    const displayName = $currentUser.firstName || $currentUser.email.split('@')[0];
    
    return (
      <div ref={dropdownRef} style={{ position: 'relative' }}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          style={buttonStyle}
          className="account-btn"
        >
          {$currentUser.avatar ? (
            <img 
              src={$currentUser.avatar} 
              alt={displayName}
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0077b6, #023e8a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: '700'
            }}>
              {displayName[0].toUpperCase()}
            </div>
          )}
          <span className="action-label" style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {displayName}
          </span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '2px' }}>
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {/* Logged In Dropdown */}
        <div style={dropdownStyle}>
          <div style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9', marginBottom: '8px' }}>
            <div style={{ fontWeight: '700', color: '#1e293b', marginBottom: '2px' }}>
              {$currentUser.firstName} {$currentUser.lastName}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>{$currentUser.email}</div>
          </div>
          
          <a 
            href="/account/dashboard/" 
            style={dropdownLinkStyle}
            className="dropdown-link"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2">
              <rect width="7" height="9" x="3" y="3" rx="1"></rect>
              <rect width="7" height="5" x="14" y="3" rx="1"></rect>
              <rect width="7" height="9" x="14" y="12" rx="1"></rect>
              <rect width="7" height="5" x="3" y="16" rx="1"></rect>
            </svg>
            {t(lang, 'common.dashboard')}
          </a>
          
          <a 
            href="/account/dashboard/?tab=orders" 
            style={dropdownLinkStyle}
            className="dropdown-link"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <path d="M3 6h18"></path>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {t(lang, 'common.myOrders')}
          </a>
          
          <a 
            href="/account/dashboard/?tab=settings" 
            style={dropdownLinkStyle}
            className="dropdown-link"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            {t(lang, 'common.settings')}
          </a>
          
          <div style={{ borderTop: '1px solid #f1f5f9', marginTop: '8px', paddingTop: '8px' }}>
            <button
              onClick={() => {
                logout();
                window.location.href = '/';
              }}
              style={{
                ...dropdownLinkStyle,
                width: '100%',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: '#ef4444'
              }}
              className="dropdown-link logout-link"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" x2="9" y1="12" y2="12"></line>
              </svg>
              {t(lang, 'common.signOut')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, show Account with dropdown for login/register
  return (
    <div 
      ref={dropdownRef} 
      style={{ position: 'relative' }}
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <a
        href="/checkout/"
        style={buttonStyle}
        className="account-btn"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span className="action-label">{t(lang, 'nav.account')}</span>
      </a>

      {/* Not Logged In Dropdown */}
      <div style={dropdownStyle}>
        <div style={{ padding: '16px 14px', textAlign: 'center', borderBottom: '1px solid #f1f5f9', marginBottom: '8px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.1), rgba(0, 150, 199, 0.1))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>{t(lang, 'common.welcome')}</div>
          <div style={{ fontSize: '13px', color: '#64748b' }}>{t(lang, 'common.signInForBestExperience')}</div>
        </div>
        
        <a 
          href="/checkout/" 
          style={{
            display: 'block',
            padding: '12px 16px',
            background: 'linear-gradient(135deg, #0077b6, #023e8a)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '8px'
          }}
        >
          {t(lang, 'common.signIn')}
        </a>
        
        <a 
          href="/checkout/" 
          style={{
            display: 'block',
            padding: '12px 16px',
            background: '#f8fafc',
            color: '#1e293b',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            textAlign: 'center',
            border: '1px solid #e2e8f0'
          }}
        >
          {t(lang, 'common.createAccount')}
        </a>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          padding: '16px 0 8px',
          marginTop: '8px'
        }}>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>{t(lang, 'common.or')}</span>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={async () => {
              await loginWithGoogle();
              window.location.href = '/account/dashboard/';
            }}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '10px',
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              color: '#374151'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button
            onClick={async () => {
              await loginWithFacebook();
              window.location.href = '/account/dashboard/';
            }}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '10px',
              background: '#1877f2',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              color: 'white'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
        </div>
      </div>

      <style>{`
        .account-btn:hover {
          background: rgba(0, 119, 182, 0.08) !important;
        }
        .dropdown-link:hover {
          background: #f8fafc !important;
        }
        .logout-link:hover {
          background: #fef2f2 !important;
        }
      `}</style>
    </div>
  );
}
