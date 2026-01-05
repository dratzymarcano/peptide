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

// Initialize from localStorage
if (isBrowser) {
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

// Social login (simulated)
export async function loginWithGoogle(): Promise<User> {
  isAuthLoading.set(true);
  authError.set(null);
  
  // Simulate OAuth flow
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // In production, this would use actual Google OAuth
  // For demo, we create/login a mock Google user
  const mockGoogleUser: User = {
    id: generateId(),
    email: 'demo.user@gmail.com',
    firstName: 'Demo',
    lastName: 'User',
    createdAt: new Date().toISOString(),
    provider: 'google',
    avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=0077b6&color=fff'
  };
  
  currentUser.set(mockGoogleUser);
  saveAuthToStorage();
  isAuthLoading.set(false);
  
  return mockGoogleUser;
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
