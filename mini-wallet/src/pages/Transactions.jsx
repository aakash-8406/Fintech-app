import { useState, useEffect } from 'react';
import { getTransactions } from '../services/api';
import { List, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getTransactions();
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error('Failed to fetch transactions', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, []);

  return (
    <div className="page-container">
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <List color="var(--primary)" /> Transaction History
      </h2>

      <div className="transaction-list">
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No recent transactions.</p>
        ) : (
          transactions.map(t => (
            <div key={t.id} className="transaction-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', background: t.type === 'receive' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', borderRadius: '50%' }}>
                  {t.type === 'receive' ? <ArrowDownLeft color="var(--secondary)" size={24} /> : <ArrowUpRight color="var(--danger)" size={24} />}
                </div>
                <div className="transaction-info">
                  <span className="transaction-title">{t.counterparty}</span>
                  <span className="transaction-date">{new Date(t.date).toLocaleString()}</span>
                </div>
              </div>
              <div className={t.type === 'receive' ? 'amount-positive' : 'amount-negative'}>
                {t.type === 'receive' ? '+' : '-'}${t.amount.toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Transactions;
