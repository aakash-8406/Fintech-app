const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory persistent state (for simple demonstration without a real database)
let balance = 1250.00;
let transactions = [
  { id: 1, type: 'receive', amount: 500, date: new Date(Date.now() - 86400000 * 2).toISOString(), counterparty: 'Employer Inc.' },
  { id: 2, type: 'send', amount: 50, date: new Date(Date.now() - 86400000).toISOString(), counterparty: 'jane.doe@example.com' },
];

// HEALTH ENDPOINT (Crucial for Kubernetes Liveness/Readiness probes)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// GET BLANACE
app.get('/api/balance', (req, res) => {
  res.json({ balance });
});

// ADD MONEY
app.post('/api/add', (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }
  
  balance += parseFloat(amount);
  transactions.unshift({
    id: Date.now(),
    type: 'receive',
    amount: parseFloat(amount),
    date: new Date().toISOString(),
    counterparty: 'Bank Deposit'
  });
  
  res.json({ success: true, balance });
});

// SEND MONEY
app.post('/api/send', (req, res) => {
  const { email, amount } = req.body;
  if (!email || !amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  
  if (balance < amount) {
    return res.status(400).json({ error: 'Insufficient funds' });
  }
  
  balance -= parseFloat(amount);
  transactions.unshift({
    id: Date.now(),
    type: 'send',
    amount: parseFloat(amount),
    date: new Date().toISOString(),
    counterparty: email
  });
  
  res.json({ success: true, balance });
});

// GET TRANSACTIONS
app.get('/api/transactions', (req, res) => {
  res.json({ transactions });
});

app.listen(port, () => {
  console.log(`Mini Wallet Backend running on port ${port}`);
});
