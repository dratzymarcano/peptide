import { atom, computed } from 'nanostores';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: string;
  provider?: 'email' | 'google' | 'facebook';
  avatar?: string;
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  county: string;
  postcode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  paymentMethod: 'bank-transfer' | 'bitcoin';
  paymentStatus: 'pending' | 'paid' | 'failed';
  items: Array<{
    id: string;
    title: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: Omit<Address, 'id' | 'isDefault'>;
  trackingNumber?: string;
}

// Auth state atoms
export const currentUser = atom<User | null>(null);
export const isAuthenticated = computed(currentUser, user => user !== null);
export const userOrders = atom<Order[]>([]);
export const userAddresses = atom<Address[]>([]);
export const isAuthLoading = atom<boolean>(false);
export const authError = atom<string | null>(null);

// Browser check
const isBrowser = typeof window !== 'undefined';

// Cookie helper
function getCookie(name: string): string | null {
  if (!isBrowser) return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function deleteCookie(name: string) {
  if (isBrowser) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

// Save to localStorage
function saveAuthToStorage() {
  if (isBrowser) {
    const user = currentUser.get();
    if (user) {
      localStorage.setItem('peptide-user', JSON.stringify(user));
      localStorage.setItem('peptide-orders', JSON.stringify(userOrders.get()));
      localStorage.setItem('peptide-addresses', JSON.stringify(userAddresses.get()));
    } else {
      localStorage.removeItem('peptide-user');
      localStorage.removeItem('peptide-orders');
      localStorage.removeItem('peptide-addresses');
    }
  }
}

// Check for Google auth callback cookie
function checkGoogleAuthCookie() {
  if (!isBrowser) return;
  
  const authCookie = getCookie('peptide-google-auth');
  
  if (authCookie) {
    console.log('Found Google auth cookie, attempting to login...');
    try {
      let user;
      try {
        // Try decoding first (standard)
        user = JSON.parse(decodeURIComponent(authCookie));
      } catch (e) {
        // Fallback to raw parsing
        console.warn('Failed to decode cookie, trying raw parse...');
        user = JSON.parse(authCookie);
      }

      console.log('Google login successful for:', user.email);
      currentUser.set(user);
      saveAuthToStorage();
      // Clear the auth cookie after processing
      deleteCookie('peptide-google-auth');
    } catch (e) {
      console.error('Failed to parse Google auth cookie:', e);
      deleteCookie('peptide-google-auth');
    }
  }
}

// Initialize from localStorage
if (isBrowser) {
  // First check for Google auth callback
  checkGoogleAuthCookie();
  
  // Then load from localStorage if no user set
  if (!currentUser.get()) {
    const savedUser = localStorage.getItem('peptide-user');
    const savedOrders = localStorage.getItem('peptide-orders');
    const savedAddresses = localStorage.getItem('peptide-addresses');
    
    if (savedUser) {
      try {
        currentUser.set(JSON.parse(savedUser));
      } catch (e) {
        currentUser.set(null);
      }
    }
    
    if (savedOrders) {
      try {
        userOrders.set(JSON.parse(savedOrders));
      } catch (e) {
        userOrders.set([]);
      }
    }
    
    if (savedAddresses) {
      try {
        userAddresses.set(JSON.parse(savedAddresses));
      } catch (e) {
        userAddresses.set([]);
      }
    }
  }
}

// Generate unique ID
function generateId(): string {
  return 'usr_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
}

// Register with email/password
export async function registerWithEmail(
  email: string, 
  password: string, 
  firstName: string, 
  lastName: string
): Promise<User> {
  isAuthLoading.set(true);
  authError.set(null);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Check if user already exists (in real app, this would be server-side)
  const existingUsers = JSON.parse(localStorage.getItem('peptide-all-users') || '[]');
  if (existingUsers.find((u: any) => u.email === email)) {
    isAuthLoading.set(false);
    authError.set('An account with this email already exists');
    throw new Error('An account with this email already exists');
  }
  
  const newUser: User = {
    id: generateId(),
    email,
    firstName,
    lastName,
    createdAt: new Date().toISOString(),
    provider: 'email'
  };
  
  // Save to "database" (localStorage for demo)
  existingUsers.push({ ...newUser, password });
  localStorage.setItem('peptide-all-users', JSON.stringify(existingUsers));
  
  currentUser.set(newUser);
  saveAuthToStorage();

  // Send welcome email
  try {
    fetch('/api/welcome-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: `${firstName} ${lastName}` })
    });
  } catch (err) {
      console.error('Welcome email failed', err);
  }

  isAuthLoading.set(false);
  
  return newUser;
}

// Login with email/password
export async function loginWithEmail(email: string, password: string): Promise<User> {
  isAuthLoading.set(true);
  authError.set(null);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const existingUsers = JSON.parse(localStorage.getItem('peptide-all-users') || '[]');
  const user = existingUsers.find((u: any) => u.email === email && u.password === password);
  
  if (!user) {
    isAuthLoading.set(false);
    authError.set('Invalid email or password');
    throw new Error('Invalid email or password');
  }
  
  const { password: _, ...userData } = user;
  currentUser.set(userData);
  
  // Load user's orders
  const allOrders = JSON.parse(localStorage.getItem('peptide-all-orders') || '[]');
  const userOrdersList = allOrders.filter((o: any) => o.userId === userData.id);
  userOrders.set(userOrdersList);
  
  saveAuthToStorage();
  isAuthLoading.set(false);
  
  return userData;
}

// Social login - redirects to Google OAuth
export async function loginWithGoogle(returnUrl?: string): Promise<void> {
  isAuthLoading.set(true);
  authError.set(null);
  
  // Get current language from URL path
  let lang = 'en';
  if (isBrowser) {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const supportedLangs = ['nl', 'de', 'fr', 'es', 'it'];
    if (pathParts[0] && supportedLangs.includes(pathParts[0])) {
      lang = pathParts[0];
    }
  }
  
  // Build the OAuth URL with return path and language
  const params = new URLSearchParams({
    returnUrl: returnUrl || '/account/dashboard/',
    lang
  });
  
  // Redirect to our OAuth initiation endpoint
  if (isBrowser) {
    window.location.href = `/api/auth/google?${params.toString()}`;
  }
}

export async function loginWithFacebook(): Promise<User> {
  isAuthLoading.set(true);
  authError.set(null);
  
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  const mockFacebookUser: User = {
    id: generateId(),
    email: 'demo.user@facebook.com',
    firstName: 'Demo',
    lastName: 'User',
    createdAt: new Date().toISOString(),
    provider: 'facebook',
    avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=1877f2&color=fff'
  };
  
  currentUser.set(mockFacebookUser);
  saveAuthToStorage();
  isAuthLoading.set(false);
  
  return mockFacebookUser;
}

// Logout
export function logout() {
  currentUser.set(null);
  userOrders.set([]);
  userAddresses.set([]);
  saveAuthToStorage();
}

// Add order to user's history
export function addOrder(order: Omit<Order, 'id' | 'date'>): Order {
  const newOrder: Order = {
    ...order,
    id: 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    date: new Date().toISOString()
  };
  
  const user = currentUser.get();
  
  if (user) {
    // Add to user's orders
    const currentOrders = userOrders.get();
    userOrders.set([newOrder, ...currentOrders]);
    
    // Also save to "all orders" with userId
    const allOrders = JSON.parse(localStorage.getItem('peptide-all-orders') || '[]');
    allOrders.push({ ...newOrder, userId: user.id });
    localStorage.setItem('peptide-all-orders', JSON.stringify(allOrders));
    
    saveAuthToStorage();
  }
  
  return newOrder;
}

// Add/update address
export function saveAddress(address: Omit<Address, 'id'>): Address {
  const newAddress: Address = {
    ...address,
    id: 'addr_' + Math.random().toString(36).substring(2, 8)
  };
  
  const currentAddresses = userAddresses.get();
  
  // If setting as default, unset other defaults
  if (address.isDefault) {
    currentAddresses.forEach(a => a.isDefault = false);
  }
  
  userAddresses.set([...currentAddresses, newAddress]);
  saveAuthToStorage();
  
  return newAddress;
}

// Update user profile
export function updateProfile(updates: Partial<Pick<User, 'firstName' | 'lastName' | 'phone'>>): User | null {
  const user = currentUser.get();
  if (!user) return null;
  
  const updatedUser = { ...user, ...updates };
  currentUser.set(updatedUser);
  
  // Update in "database" too
  const existingUsers = JSON.parse(localStorage.getItem('peptide-all-users') || '[]');
  const userIndex = existingUsers.findIndex((u: any) => u.id === user.id);
  if (userIndex > -1) {
    existingUsers[userIndex] = { ...existingUsers[userIndex], ...updates };
    localStorage.setItem('peptide-all-users', JSON.stringify(existingUsers));
  }
  
  saveAuthToStorage();
  return updatedUser;
}
