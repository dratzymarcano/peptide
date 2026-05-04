import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import {
  currentUser,
  isAuthenticated,
  userAddresses,
  userOrders,
  logout,
  updateProfile,
} from '../store/authStore';
import type { Order } from '../store/authStore';

type Tab = 'overview' | 'orders' | 'addresses' | 'settings';

interface DashboardProps {
  labels?: Record<string, string>;
  paths?: {
    checkout?: string;
    home?: string;
    shop?: string;
  };
}

const defaultLabels: Record<string, string> = {
  overview: 'Overview',
  orders: 'Orders',
  addresses: 'Addresses',
  settings: 'Settings',
  redirecting: 'Redirecting to checkout',
  redirectBody: 'Sign in or create an account during checkout to view order history.',
  accountSections: 'Account sections',
  signOut: 'Sign out',
  accountOverview: 'Account overview',
  welcomeBack: 'Welcome back, {name}',
  welcomeBody: 'Track recent orders and keep delivery details ready for future research supply purchases.',
  accountSummary: 'Account summary',
  totalSpend: 'Total spend',
  defaultDeliveryAddress: 'Default delivery address',
  noDefaultAddress: 'No default address is saved yet.',
  total: '{count} total',
  noOrdersTitle: 'No orders yet',
  noOrdersBody: 'Completed checkout orders will appear here.',
  browseCatalogue: 'Browse catalogue',
  order: 'Order',
  date: 'Date',
  status: 'Status',
  payment: 'Payment',
  saved: '{count} saved',
  noAddresses: 'Saved delivery addresses will appear after checkout.',
  default: 'Default',
  profileSettings: 'Profile settings',
  editProfile: 'Edit profile',
  firstName: 'First name',
  lastName: 'Last name',
  phone: 'Phone',
  saveChanges: 'Save changes',
  cancel: 'Cancel',
  name: 'Name',
  email: 'Email',
  notProvided: 'Not provided',
  provider: 'Provider',
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function statusClass(status: Order['status'] | Order['paymentStatus']) {
  if (status === 'delivered' || status === 'paid') return 'badge-success';
  if (status === 'failed') return 'badge-danger';
  if (status === 'pending') return 'badge-warning';
  return 'badge-blue';
}

export default function Dashboard({ labels, paths }: DashboardProps) {
  const copy = { ...defaultLabels, ...labels };
  const tabs: Array<{ id: Tab; label: string }> = [
    { id: 'overview', label: copy.overview },
    { id: 'orders', label: copy.orders },
    { id: 'addresses', label: copy.addresses },
    { id: 'settings', label: copy.settings },
  ];
  const $currentUser = useStore(currentUser);
  const $isAuthenticated = useStore(isAuthenticated);
  const $userOrders = useStore(userOrders);
  const $userAddresses = useStore(userAddresses);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ firstName: '', lastName: '', phone: '' });

  useEffect(() => {
    if (!$isAuthenticated) window.location.href = paths?.checkout || '/checkout/';
  }, [$isAuthenticated, paths?.checkout]);

  useEffect(() => {
    if ($currentUser) {
      setEditForm({
        firstName: $currentUser.firstName || '',
        lastName: $currentUser.lastName || '',
        phone: $currentUser.phone || '',
      });
    }
  }, [$currentUser]);

  if (!$isAuthenticated || !$currentUser) {
    return (
      <div className="commerce-empty card">
        <h2>{copy.redirecting}</h2>
        <p>{copy.redirectBody}</p>
      </div>
    );
  }

  const orderTotal = $userOrders.reduce((sum, order) => sum + order.total, 0);
  const defaultAddress = $userAddresses.find((address) => address.isDefault);

  function handleSaveProfile() {
    updateProfile(editForm);
    setIsEditing(false);
  }

  function handleLogout() {
    logout();
    window.location.href = paths?.home || '/';
  }

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar card">
        <div className="dashboard-user">
          <div className="dashboard-avatar" aria-hidden="true">
            {$currentUser.avatar ? <img src={$currentUser.avatar} alt={`${$currentUser.firstName ?? $currentUser.email ?? 'Account'} avatar`} loading="lazy" decoding="async" /> : <span>{$currentUser.firstName?.[0] || 'U'}</span>}
          </div>
          <h2>{$currentUser.firstName} {$currentUser.lastName}</h2>
          <p>{$currentUser.email}</p>
        </div>

        <nav className="dashboard-tabs" aria-label={copy.accountSections}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={activeTab === tab.id ? 'is-active' : ''}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <button className="btn btn-secondary btn-block" type="button" onClick={handleLogout}>{copy.signOut}</button>
      </aside>

      <main className="dashboard-main">
        {activeTab === 'overview' && (
          <div className="dashboard-stack">
            <section className="card dashboard-welcome">
              <span className="eyebrow">{copy.accountOverview}</span>
              <h2>{copy.welcomeBack.replace('{name}', $currentUser.firstName)}</h2>
              <p>{copy.welcomeBody}</p>
            </section>

            <section className="dashboard-metrics" aria-label={copy.accountSummary}>
              <div className="card metric-card"><span>{copy.orders}</span><strong>{$userOrders.length}</strong></div>
              <div className="card metric-card"><span>{copy.totalSpend}</span><strong>€{orderTotal.toFixed(2)}</strong></div>
              <div className="card metric-card"><span>{copy.addresses}</span><strong>{$userAddresses.length}</strong></div>
            </section>

            <section className="card">
              <h2>{copy.defaultDeliveryAddress}</h2>
              {defaultAddress ? (
                <p>{defaultAddress.address}, {defaultAddress.city}, {defaultAddress.postcode}</p>
              ) : (
                <p className="text-muted">{copy.noDefaultAddress}</p>
              )}
            </section>
          </div>
        )}

        {activeTab === 'orders' && (
          <section className="card dashboard-stack">
            <div className="dashboard-section-heading">
              <h2>{copy.orders}</h2>
              <span className="badge badge-blue">{copy.total.replace('{count}', String($userOrders.length))}</span>
            </div>
            {$userOrders.length === 0 ? (
              <div className="commerce-empty compact">
                <h3>{copy.noOrdersTitle}</h3>
                <p>{copy.noOrdersBody}</p>
                <a className="btn btn-primary" href={paths?.shop || '/shop/'}>{copy.browseCatalogue}</a>
              </div>
            ) : (
              <div className="dashboard-table-wrap">
                <table className="table-clean">
                  <thead>
                    <tr><th>{copy.order}</th><th>{copy.date}</th><th>{copy.status}</th><th>{copy.payment}</th><th className="num">{copy.totalSpend}</th></tr>
                  </thead>
                  <tbody>
                    {$userOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{formatDate(order.date)}</td>
                        <td><span className={`badge ${statusClass(order.status)}`}>{order.status}</span></td>
                        <td><span className={`badge ${statusClass(order.paymentStatus)}`}>{order.paymentStatus}</span></td>
                        <td className="num">€{order.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {activeTab === 'addresses' && (
          <section className="card dashboard-stack">
            <div className="dashboard-section-heading">
              <h2>{copy.addresses}</h2>
              <span className="badge badge-blue">{copy.saved.replace('{count}', String($userAddresses.length))}</span>
            </div>
            {$userAddresses.length === 0 ? (
              <p className="text-muted">{copy.noAddresses}</p>
            ) : (
              <div className="address-grid">
                {$userAddresses.map((address) => (
                  <article className="address-card" key={address.id}>
                    <div>
                      <h3>{address.firstName} {address.lastName}</h3>
                      {address.isDefault && <span className="badge badge-success">{copy.default}</span>}
                    </div>
                    <p>{address.address}<br />{address.city}, {address.county}<br />{address.postcode}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'settings' && (
          <section className="card dashboard-stack">
            <div className="dashboard-section-heading">
              <h2>{copy.profileSettings}</h2>
              {!isEditing && <button className="btn btn-secondary" type="button" onClick={() => setIsEditing(true)}>{copy.editProfile}</button>}
            </div>
            {isEditing ? (
              <div className="profile-form">
                <label className="field">
                  <span>{copy.firstName}</span>
                  <input className="input" value={editForm.firstName} onChange={(event) => setEditForm({ ...editForm, firstName: event.target.value })} />
                </label>
                <label className="field">
                  <span>{copy.lastName}</span>
                  <input className="input" value={editForm.lastName} onChange={(event) => setEditForm({ ...editForm, lastName: event.target.value })} />
                </label>
                <label className="field profile-form-wide">
                  <span>{copy.phone}</span>
                  <input className="input" value={editForm.phone} onChange={(event) => setEditForm({ ...editForm, phone: event.target.value })} />
                </label>
                <div className="profile-form-actions">
                  <button className="btn btn-primary" type="button" onClick={handleSaveProfile}>{copy.saveChanges}</button>
                  <button className="btn btn-ghost" type="button" onClick={() => setIsEditing(false)}>{copy.cancel}</button>
                </div>
              </div>
            ) : (
              <dl className="profile-details">
                <div><dt>{copy.name}</dt><dd>{$currentUser.firstName} {$currentUser.lastName}</dd></div>
                <div><dt>{copy.email}</dt><dd>{$currentUser.email}</dd></div>
                <div><dt>{copy.phone}</dt><dd>{$currentUser.phone || copy.notProvided}</dd></div>
                <div><dt>{copy.provider}</dt><dd>{$currentUser.provider || 'email'}</dd></div>
              </dl>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
