import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { 
  currentUser, 
  isAuthenticated,
  userOrders,
  userAddresses,
  logout,
  updateProfile
} from '../store/authStore';
import type { Order } from '../store/authStore';
import { type SupportedLanguage, t } from '../i18n/translations';

type Tab = 'overview' | 'orders' | 'addresses' | 'settings';

interface DashboardProps {
  lang?: SupportedLanguage;
}

export default function Dashboard({ lang = 'en' }: DashboardProps) {
  const $currentUser = useStore(currentUser);
  const $isAuthenticated = useStore(isAuthenticated);
  const $userOrders = useStore(userOrders);
  const $userAddresses = useStore(userAddresses);
  
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });

  useEffect(() => {
    if ($currentUser) {
      setEditForm({
        firstName: $currentUser.firstName || '',
        lastName: $currentUser.lastName || '',
        phone: $currentUser.phone || ''
      });
    }
  }, [$currentUser]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!$isAuthenticated && typeof window !== 'undefined') {
      const timer = setTimeout(() => {
         // Double check before redirecting
         if (!isAuthenticated.get()) {
            window.location.href = '/checkout/';
         }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [$isAuthenticated]);

  if (!$isAuthenticated) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <p>{t(lang, 'accountPage.redirecting')}</p>
      </div>
    );
  }

  const cardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
    border: '1px solid rgba(0,0,0,0.06)',
    overflow: 'hidden',
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleSaveProfile = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return { bg: '#fef3c7', text: '#92400e' };
      case 'confirmed': return { bg: '#dbeafe', text: '#1e40af' };
      case 'processing': return { bg: '#e0e7ff', text: '#3730a3' };
      case 'shipped': return { bg: '#d1fae5', text: '#065f46' };
      case 'delivered': return { bg: '#dcfce7', text: '#166534' };
      default: return { bg: '#f1f5f9', text: '#475569' };
    }
  };

  const getPaymentStatusColor = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'pending': return { bg: '#fef3c7', text: '#92400e' };
      case 'paid': return { bg: '#dcfce7', text: '#166534' };
      case 'failed': return { bg: '#fee2e2', text: '#991b1b' };
      default: return { bg: '#f1f5f9', text: '#475569' };
    }
  };

  const localeMap: Record<SupportedLanguage, string> = {
    en: 'en-GB',
    nl: 'nl-NL',
    de: 'de-DE',
    fr: 'fr-FR',
    es: 'es-ES',
    it: 'it-IT',
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(localeMap[lang] || 'en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const tabs = [
    { id: 'overview', label: t(lang, 'accountPage.overview'), icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="7" height="9" x="3" y="3" rx="1"></rect>
        <rect width="7" height="5" x="14" y="3" rx="1"></rect>
        <rect width="7" height="9" x="14" y="12" rx="1"></rect>
        <rect width="7" height="5" x="3" y="16" rx="1"></rect>
      </svg>
    )},
    { id: 'orders', label: t(lang, 'accountPage.orders'), icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
        <path d="M3 6h18"></path>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
      </svg>
    )},
    { id: 'addresses', label: t(lang, 'accountPage.addresses'), icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    )},
    { id: 'settings', label: t(lang, 'accountPage.settings'), icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    )}
  ];

  return (
    <div className="container dashboard-container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-3 mb-4">
          <div style={{ ...cardStyle, padding: '24px', marginBottom: '20px' }}>
            {/* User Info */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: $currentUser?.avatar ? `url(${$currentUser.avatar})` : 'linear-gradient(135deg, #0077b6, #023e8a)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '32px',
                fontWeight: '700',
                color: 'white',
                boxShadow: '0 4px 14px rgba(0, 119, 182, 0.3)'
              }}>
                {!$currentUser?.avatar && ($currentUser?.firstName?.[0] || 'U')}
              </div>
              <h5 style={{ color: '#1e293b', fontWeight: '700', marginBottom: '4px' }}>
                {$currentUser?.firstName} {$currentUser?.lastName}
              </h5>
              <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '0' }}>{$currentUser?.email}</p>
              {$currentUser?.provider && $currentUser.provider !== 'email' && (
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginTop: '8px',
                  background: $currentUser.provider === 'google' ? '#f3f4f6' : '#eff6ff',
                  color: $currentUser.provider === 'google' ? '#374151' : '#1d4ed8',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {$currentUser.provider === 'google' ? t(lang, 'accountPage.googleAccount') : t(lang, 'accountPage.facebookAccount')}
                </span>
              )}
            </div>

            {/* Navigation */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    background: activeTab === tab.id ? 'linear-gradient(135deg, #0077b6, #023e8a)' : 'transparent',
                    color: activeTab === tab.id ? 'white' : '#64748b',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '15px',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '14px',
              background: 'white',
              color: '#ef4444',
              border: '2px solid #fee2e2',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '15px'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" x2="9" y1="12" y2="12"></line>
            </svg>
            {t(lang, 'accountPage.logout')}
          </button>
        </div>

        {/* Main Content */}
        <div className="col-lg-9">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Welcome Card */}
              <div style={{ 
                ...cardStyle, 
                background: 'linear-gradient(135deg, #0077b6, #023e8a)',
                padding: '32px',
                marginBottom: '24px'
              }}>
                <h3 style={{ color: 'white', fontWeight: '700', marginBottom: '8px' }}>
                  {t(lang, 'accountPage.welcomeBack')}, {$currentUser?.firstName}! 👋
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '0' }}>
                  {t(lang, 'accountPage.dashboardDesc')}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="row">
                <div className="col-md-4 mb-4">
                  <div style={{ ...cardStyle, padding: '24px' }}>
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.1), rgba(0, 150, 199, 0.1))',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                        <path d="M3 6h18"></path>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                    </div>
                    <h2 style={{ color: '#1e293b', fontWeight: '800', marginBottom: '4px' }}>{$userOrders.length}</h2>
                    <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '0' }}>{t(lang, 'accountPage.totalOrders')}</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div style={{ ...cardStyle, padding: '24px' }}>
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <h2 style={{ color: '#1e293b', fontWeight: '800', marginBottom: '4px' }}>
                      {$userOrders.filter(o => o.status === 'delivered').length}
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '0' }}>{t(lang, 'accountPage.completed')}</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div style={{ ...cardStyle, padding: '24px' }}>
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.1))',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <h2 style={{ color: '#1e293b', fontWeight: '800', marginBottom: '4px' }}>
                      {$userOrders.filter(o => o.status === 'pending' || o.status === 'processing').length}
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '0' }}>{t(lang, 'accountPage.inProgress')}</p>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div style={{ ...cardStyle, padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h5 style={{ color: '#1e293b', fontWeight: '700', marginBottom: '0' }}>{t(lang, 'accountPage.recentOrders')}</h5>
                  <button
                    onClick={() => setActiveTab('orders')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#0077b6',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    {t(lang, 'accountPage.viewAll')} →
                  </button>
                </div>
                {$userOrders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" style={{ marginBottom: '16px' }}>
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                      <path d="M3 6h18"></path>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    <p style={{ color: '#64748b', marginBottom: '16px' }}>{t(lang, 'accountPage.noOrders')}</p>
                    <a
                      href="/shop/"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'linear-gradient(135deg, #0077b6, #023e8a)',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '10px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        fontSize: '14px'
                      }}
                    >
                      {t(lang, 'accountPage.shopNow')}
                    </a>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {$userOrders.slice(0, 3).map(order => {
                      const statusColors = getStatusColor(order.status);
                      return (
                        <div key={order.id} style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '16px',
                          background: '#f8fafc',
                          borderRadius: '12px'
                        }}>
                          <div>
                            <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>{order.id}</div>
                            <div style={{ color: '#64748b', fontSize: '13px' }}>{formatDate(order.date)}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{
                              display: 'inline-block',
                              background: statusColors.bg,
                              color: statusColors.text,
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: '600',
                              textTransform: 'capitalize',
                              marginBottom: '4px'
                            }}>{order.status}</span>
                            <div style={{ fontWeight: '700', color: '#0077b6' }}>£{order.total.toFixed(2)}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div style={{ ...cardStyle, padding: '24px' }}>
              <h4 style={{ color: '#1e293b', fontWeight: '700', marginBottom: '24px' }}>{t(lang, 'accountPage.myOrders')}</h4>
              {$userOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" style={{ marginBottom: '20px' }}>
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                    <path d="M3 6h18"></path>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                  <h5 style={{ color: '#1e293b', marginBottom: '8px' }}>{t(lang, 'accountPage.noOrders')}</h5>
                  <p style={{ color: '#64748b', marginBottom: '24px' }}>{t(lang, 'accountPage.noOrdersDesc')}</p>
                  <a
                    href="/shop/"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'linear-gradient(135deg, #0077b6, #023e8a)',
                      color: 'white',
                      padding: '14px 28px',
                      borderRadius: '12px',
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}
                  >
                    {t(lang, 'cart.browseProducts')}
                  </a>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {$userOrders.map(order => {
                    const statusColors = getStatusColor(order.status);
                    const paymentColors = getPaymentStatusColor(order.paymentStatus);
                    return (
                      <div key={order.id} style={{ 
                        border: '1px solid #e2e8f0',
                        borderRadius: '14px',
                        overflow: 'hidden'
                      }}>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '20px',
                          background: '#f8fafc',
                          borderBottom: '1px solid #e2e8f0'
                        }}>
                          <div>
                            <div style={{ fontWeight: '700', color: '#1e293b', marginBottom: '4px', fontSize: '1.1rem' }}>{order.id}</div>
                            <div style={{ color: '#64748b', fontSize: '14px' }}>{t(lang, 'accountPage.placedOn')} {formatDate(order.date)}</div>
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <span style={{
                              background: statusColors.bg,
                              color: statusColors.text,
                              padding: '6px 14px',
                              borderRadius: '20px',
                              fontSize: '13px',
                              fontWeight: '600',
                              textTransform: 'capitalize'
                            }}>{order.status}</span>
                            <span style={{
                              background: paymentColors.bg,
                              color: paymentColors.text,
                              padding: '6px 14px',
                              borderRadius: '20px',
                              fontSize: '13px',
                              fontWeight: '600',
                              textTransform: 'capitalize'
                            }}>{order.paymentStatus}</span>
                          </div>
                        </div>
                        <div style={{ padding: '20px' }}>
                          {order.items.map((item, idx) => (
                            <div key={idx} style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between',
                              padding: '8px 0',
                              borderBottom: idx < order.items.length - 1 ? '1px solid #f1f5f9' : 'none'
                            }}>
                              <span style={{ color: '#1e293b' }}>{item.title} × {item.quantity}</span>
                              <span style={{ fontWeight: '600', color: '#0077b6' }}>£{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            padding: '16px 0 0',
                            marginTop: '12px',
                            borderTop: '2px solid #e2e8f0'
                          }}>
                            <span style={{ fontWeight: '700', color: '#1e293b' }}>Total</span>
                            <span style={{ fontWeight: '800', color: '#0077b6', fontSize: '1.25rem' }}>£{order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div style={{ ...cardStyle, padding: '24px' }}>
              <h4 style={{ color: '#1e293b', fontWeight: '700', marginBottom: '24px' }}>{t(lang, 'accountPage.savedAddresses')}</h4>
              {$userAddresses.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" style={{ marginBottom: '20px' }}>
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <h5 style={{ color: '#1e293b', marginBottom: '8px' }}>{t(lang, 'accountPage.noAddresses')}</h5>
                  <p style={{ color: '#64748b', marginBottom: '0' }}>{t(lang, 'accountPage.addressesSavedDuringCheckout')}</p>
                </div>
              ) : (
                <div className="row">
                  {$userAddresses.map(address => (
                    <div key={address.id} className="col-md-6 mb-3">
                      <div style={{ 
                        padding: '20px',
                        border: address.isDefault ? '2px solid #0077b6' : '1px solid #e2e8f0',
                        borderRadius: '12px',
                        background: address.isDefault ? 'rgba(0, 119, 182, 0.05)' : 'white'
                      }}>
                        {address.isDefault && (
                          <span style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, #0077b6, #023e8a)',
                            color: 'white',
                            padding: '2px 10px',
                            borderRadius: '10px',
                            fontSize: '11px',
                            fontWeight: '600',
                            marginBottom: '12px'
                          }}>{t(lang, 'accountPage.defaultBadge')}</span>
                        )}
                        <p style={{ color: '#1e293b', margin: 0, lineHeight: '1.6' }}>
                          <strong>{address.firstName} {address.lastName}</strong><br />
                          {address.address}<br />
                          {address.city}{address.county ? `, ${address.county}` : ''} {address.postcode}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div style={{ ...cardStyle, padding: '32px' }}>
              <h4 style={{ color: '#1e293b', fontWeight: '700', marginBottom: '28px' }}>{t(lang, 'accountPage.accountSettings')}</h4>
              
              <div style={{ marginBottom: '32px' }}>
                <h5 style={{ color: '#1e293b', fontWeight: '600', marginBottom: '20px' }}>{t(lang, 'accountPage.profileInfo')}</h5>
                {isEditing ? (
                  <div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label style={{ display: 'block', color: '#64748b', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>{t(lang, 'accountPage.firstName')}</label>
                        <input 
                          type="text"
                          value={editForm.firstName}
                          onChange={e => setEditForm({...editForm, firstName: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '14px 16px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '10px',
                            fontSize: '15px'
                          }}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label style={{ display: 'block', color: '#64748b', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>{t(lang, 'accountPage.lastName')}</label>
                        <input 
                          type="text"
                          value={editForm.lastName}
                          onChange={e => setEditForm({...editForm, lastName: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '14px 16px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '10px',
                            fontSize: '15px'
                          }}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label style={{ display: 'block', color: '#64748b', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>{t(lang, 'accountPage.phoneOptional')}</label>
                      <input 
                        type="tel"
                        value={editForm.phone}
                        onChange={e => setEditForm({...editForm, phone: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          border: '2px solid #e2e8f0',
                          borderRadius: '10px',
                          fontSize: '15px'
                        }}
                        placeholder="+44 7123 456789"
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        onClick={handleSaveProfile}
                        style={{
                          padding: '12px 24px',
                          background: 'linear-gradient(135deg, #0077b6, #023e8a)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '10px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        {t(lang, 'accountPage.saveChanges')}
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        style={{
                          padding: '12px 24px',
                          background: 'white',
                          color: '#64748b',
                          border: '2px solid #e2e8f0',
                          borderRadius: '10px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        {t(lang, 'accountPage.cancel')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'grid', gap: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#f8fafc', borderRadius: '10px' }}>
                        <span style={{ color: '#64748b' }}>{t(lang, 'common.name')}</span>
                        <span style={{ fontWeight: '600', color: '#1e293b' }}>{$currentUser?.firstName} {$currentUser?.lastName}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#f8fafc', borderRadius: '10px' }}>
                        <span style={{ color: '#64748b' }}>{t(lang, 'common.email')}</span>
                        <span style={{ fontWeight: '600', color: '#1e293b' }}>{$currentUser?.email}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#f8fafc', borderRadius: '10px' }}>
                        <span style={{ color: '#64748b' }}>{t(lang, 'common.phone')}</span>
                        <span style={{ fontWeight: '600', color: '#1e293b' }}>{$currentUser?.phone || t(lang, 'common.notSet')}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#f8fafc', borderRadius: '10px' }}>
                        <span style={{ color: '#64748b' }}>{t(lang, 'accountPage.memberSince')}</span>
                        <span style={{ fontWeight: '600', color: '#1e293b' }}>{$currentUser?.createdAt ? formatDate($currentUser.createdAt) : 'N/A'}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      style={{
                        marginTop: '20px',
                        padding: '12px 24px',
                        background: 'linear-gradient(135deg, #0077b6, #023e8a)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      {t(lang, 'accountPage.editProfile')}
                    </button>
                  </div>
                )}
              </div>

              {/* Danger Zone */}
              <div style={{ 
                padding: '24px',
                border: '1px solid #fee2e2',
                borderRadius: '12px',
                background: 'rgba(239, 68, 68, 0.05)'
              }}>
                <h6 style={{ color: '#ef4444', fontWeight: '600', marginBottom: '8px' }}>{t(lang, 'accountPage.dangerZone')}</h6>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px' }}>
                  {t(lang, 'accountPage.deleteAccountDesc')}
                </p>
                <button
                  style={{
                    padding: '10px 20px',
                    background: 'white',
                    color: '#ef4444',
                    border: '2px solid #ef4444',
                    borderRadius: '10px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {t(lang, 'accountPage.deleteAccount')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Responsive Styles */}
      <style>{`
        /* Mobile First Dashboard Styles */
        @media (max-width: 991px) {
          .dashboard-container .col-lg-3 {
            margin-bottom: 24px;
          }
          
          /* Make sidebar horizontal on tablet */
          .dashboard-container .col-lg-3 nav {
            display: flex !important;
            flex-wrap: wrap;
            gap: 8px !important;
          }
          
          .dashboard-container .col-lg-3 nav button {
            flex: 1 1 45%;
            min-width: 140px;
          }
        }
        
        @media (max-width: 767px) {
          .dashboard-container [style*="padding: 24px"] {
            padding: 16px !important;
          }
          
          .dashboard-container [style*="padding: 32px"] {
            padding: 20px !important;
          }
          
          /* Stack stats cards */
          .dashboard-container .col-md-4 {
            flex: 0 0 100%;
            max-width: 100%;
          }
          
          /* Make navigation tabs scrollable */
          .dashboard-container .col-lg-3 nav {
            flex-wrap: nowrap !important;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 8px;
          }
          
          .dashboard-container .col-lg-3 nav button {
            flex: 0 0 auto;
            min-width: 120px;
          }
          
          /* Order items mobile layout */
          .dashboard-container [style*="display: flex"][style*="justifyContent: space-between"] {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px;
          }
        }
        
        @media (max-width: 575px) {
          /* User avatar smaller */
          .dashboard-container [style*="width: 80px"][style*="height: 80px"] {
            width: 60px !important;
            height: 60px !important;
            font-size: 24px !important;
          }
          
          /* Touch-friendly buttons */
          .dashboard-container button {
            min-height: 44px;
          }
        }
      `}</style>
    </div>
  );
}
