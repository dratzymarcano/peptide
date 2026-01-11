import { atom } from 'nanostores';

export type Currency = 'GBP' | 'EUR';

export const currentCurrency = atom<Currency>('GBP');
export const exchangeRate = atom<number>(1.20); // Default fallback

// Fetch live rates
export async function fetchExchangeRate() {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/GBP');
    if (!response.ok) throw new Error('Failed to fetch rates');
    const data = await response.json();
    if (data && data.rates && data.rates.EUR) {
      exchangeRate.set(data.rates.EUR);
      console.log('Updated exchange rate:', data.rates.EUR);
    }
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    // Keep default or read from localStorage if you were persisting
  }
}

export const formatPrice = (priceInGBP: number, currency: Currency) => {
  if (currency === 'GBP') {
    return `£${priceInGBP.toFixed(2)}`;
  }
  const rate = exchangeRate.get();
  return `€${(priceInGBP * rate).toFixed(2)}`;
};
