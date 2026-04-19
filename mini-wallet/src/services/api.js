// Connect to our NodeJS Express Backend
// We use relative paths! In production, Nginx will proxy this to the backend ClusterIP.
// In local dev, Vite proxy or direct localhost works.

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const getBalance = async () => {
  const response = await fetch(`${API_URL}/balance`);
  if (!response.ok) throw new Error('Network response was not ok');
  return { data: await response.json() };
};

export const addMoney = async (amount) => {
  const response = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: parseFloat(amount) })
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

export const sendMoney = async (email, amount) => {
  const response = await fetch(`${API_URL}/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, amount: parseFloat(amount) })
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Insufficient funds');
  }
  
  return await response.json();
};

export const getTransactions = async () => {
  const response = await fetch(`${API_URL}/transactions`);
  if (!response.ok) throw new Error('Network response was not ok');
  return { data: await response.json() };
};
