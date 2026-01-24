import { useState, useEffect } from 'react';

type SupportedLanguage = 'en' | 'nl' | 'de' | 'fr' | 'es' | 'it' | 'ru';

interface CookieConsentProps {
  lang: SupportedLanguage;
}

const cookieTranslations: Record<SupportedLanguage, {
  message: string;
  accept: string;
  decline: string;
  learnMore: string;
}> = {
  en: {
    message: 'We use cookies to improve your experience on our site. By continuing to browse, you agree to our use of cookies.',
    accept: 'Accept',
    decline: 'Decline',
    learnMore: 'Learn More',
  },
  nl: {
    message: 'Wij gebruiken cookies om uw ervaring op onze site te verbeteren. Door verder te bladeren, gaat u akkoord met ons gebruik van cookies.',
    accept: 'Accepteren',
    decline: 'Weigeren',
    learnMore: 'Meer informatie',
  },
  de: {
    message: 'Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Durch weiteres Surfen stimmen Sie der Verwendung von Cookies zu.',
    accept: 'Akzeptieren',
    decline: 'Ablehnen',
    learnMore: 'Mehr erfahren',
  },
  fr: {
    message: 'Nous utilisons des cookies pour améliorer votre expérience sur notre site. En continuant à naviguer, vous acceptez notre utilisation des cookies.',
    accept: 'Accepter',
    decline: 'Refuser',
    learnMore: 'En savoir plus',
  },
  es: {
    message: 'Utilizamos cookies para mejorar su experiencia en nuestro sitio. Al continuar navegando, acepta nuestro uso de cookies.',
    accept: 'Aceptar',
    decline: 'Rechazar',
    learnMore: 'Más información',
  },
  it: {
    message: 'Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. Continuando a navigare, accetti il nostro utilizzo dei cookie.',
    accept: 'Accetta',
    decline: 'Rifiuta',
    learnMore: 'Scopri di più',
  },
  ru: {
    message: 'Мы используем файлы cookie для улучшения вашего опыта на нашем сайте. Продолжая просмотр, вы соглашаетесь с использованием файлов cookie.',
    accept: 'Принять',
    decline: 'Отклонить',
    learnMore: 'Подробнее',
  },
};

const COOKIE_CONSENT_KEY = 'cookie-consent';

export default function CookieConsent({ lang }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const t = cookieTranslations[lang] || cookieTranslations.en;

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay for better UX - don't show immediately on page load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setIsVisible(false);
  };

  // Get the correct privacy policy URL based on language
  const privacyUrl = lang === 'en' ? '/privacy' : `/${lang}/privacy`;

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: 'linear-gradient(135deg, rgba(23, 37, 42, 0.98), rgba(30, 45, 52, 0.98))',
        backdropFilter: 'blur(10px)',
        color: '#fff',
        padding: '20px 24px',
        paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ flex: 1 }}>
          <h2
            id="cookie-consent-title"
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              marginBottom: '8px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span role="img" aria-label="Cookie">🍪</span> Cookies
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: '0.95rem',
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            {t.message}{' '}
            <a
              href={privacyUrl}
              style={{
                color: '#4dd0e1',
                textDecoration: 'underline',
                fontWeight: 500,
              }}
            >
              {t.learnMore}
            </a>
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={handleDecline}
            style={{
              padding: '14px 24px',
              fontSize: '0.95rem',
              fontWeight: 600,
              borderRadius: '10px',
              border: '2px solid rgba(255,255,255,0.3)',
              background: 'transparent',
              color: '#fff',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minWidth: '120px',
              minHeight: '48px',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            }}
          >
            {t.decline}
          </button>
          <button
            onClick={handleAccept}
            style={{
              padding: '14px 24px',
              fontSize: '0.95rem',
              fontWeight: 600,
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #0077b6, #00a8cc)',
              color: '#fff',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minWidth: '120px',
              minHeight: '48px',
              boxShadow: '0 4px 12px rgba(0,119,182,0.4)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,119,182,0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,119,182,0.4)';
            }}
          >
            {t.accept}
          </button>
        </div>
      </div>
      <style>{`
        @media (min-width: 768px) {
          div[role="dialog"] > div:first-child {
            flex-direction: row !important;
            align-items: center !important;
          }
          div[role="dialog"] > div:first-child > div:last-child {
            flex-shrink: 0;
          }
        }
      `}</style>
    </div>
  );
}
