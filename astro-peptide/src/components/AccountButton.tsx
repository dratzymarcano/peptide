import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { currentUser, isAuthLoading, isAuthenticated, loginWithFacebook, loginWithGoogle, logout } from '../store/authStore';

interface AccountButtonProps {
  labels?: {
    account?: string;
    signInError?: string;
    dashboard?: string;
    orders?: string;
    settings?: string;
    signOut?: string;
    guestSummary?: string;
    continueCheckout?: string;
    signingIn?: string;
    googleSignIn?: string;
    facebookSignIn?: string;
  };
  paths?: {
    checkout?: string;
    dashboard?: string;
  };
}

const defaultLabels = {
  account: 'Account',
  signInError: 'Sign in could not be completed. Please try again.',
  dashboard: 'Dashboard',
  orders: 'Orders',
  settings: 'Settings',
  signOut: 'Sign out',
  guestSummary: 'Use checkout or dashboard access for order history.',
  continueCheckout: 'Continue to checkout',
  signingIn: 'Signing in...',
  googleSignIn: 'Demo Google sign in',
  facebookSignIn: 'Demo Facebook sign in',
};

export default function AccountButton({ labels, paths }: AccountButtonProps) {
  const copy = { ...defaultLabels, ...labels };
  const $currentUser = useStore(currentUser);
  const $isAuthenticated = useStore(isAuthenticated);
  const $isAuthLoading = useStore(isAuthLoading);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  async function handleProviderLogin(provider: 'google' | 'facebook') {
    setError(null);
    try {
      await (provider === 'google' ? loginWithGoogle() : loginWithFacebook());
      setIsOpen(false);
    } catch {
      setError(copy.signInError);
    }
  }

  const currentAccount = isMounted ? $currentUser : null;
  const isAccountAuthenticated = isMounted && $isAuthenticated;
  const displayName = currentAccount?.firstName || currentAccount?.email.split('@')[0] || copy.account;
  const initials = displayName.slice(0, 1).toUpperCase();

  return (
    <div className="account-menu" ref={menuRef}>
      <button
        className="header-icon-btn account-trigger"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={displayName}
      >
        {isAccountAuthenticated && currentAccount?.avatar ? (
          <img className="account-avatar" src={currentAccount.avatar} alt={`${currentAccount.firstName ?? currentAccount.email ?? 'Account'} avatar`} loading="lazy" decoding="async" />
        ) : isAccountAuthenticated ? (
          <span className="account-avatar account-avatar-fallback" aria-hidden="true">{initials}</span>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )}
        <span className="action-label">{displayName}</span>
        <svg className="chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="account-dropdown" role="menu">
          {isAccountAuthenticated && currentAccount ? (
            <>
              <div className="account-summary">
                <strong>{currentAccount.firstName} {currentAccount.lastName}</strong>
                <span>{currentAccount.email}</span>
              </div>
              <a href={paths?.dashboard || '/account/dashboard/'} role="menuitem">{copy.dashboard}</a>
              <a href={`${paths?.dashboard || '/account/dashboard/'}?tab=orders`} role="menuitem">{copy.orders}</a>
              <a href={`${paths?.dashboard || '/account/dashboard/'}?tab=settings`} role="menuitem">{copy.settings}</a>
              <button
                className="account-danger"
                type="button"
                role="menuitem"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
              >
                {copy.signOut}
              </button>
            </>
          ) : (
            <>
              <div className="account-summary">
                <strong>{copy.account}</strong>
                <span>{copy.guestSummary}</span>
              </div>
              <a href={paths?.checkout || '/checkout/'} role="menuitem">{copy.continueCheckout}</a>
              <button type="button" role="menuitem" disabled={$isAuthLoading} onClick={() => handleProviderLogin('google')}>
                {$isAuthLoading ? copy.signingIn : copy.googleSignIn}
              </button>
              <button type="button" role="menuitem" disabled={$isAuthLoading} onClick={() => handleProviderLogin('facebook')}>
                {copy.facebookSignIn}
              </button>
              {error && <p className="account-error">{error}</p>}
            </>
          )}
        </div>
      )}
    </div>
  );
}