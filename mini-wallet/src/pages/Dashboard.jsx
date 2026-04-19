import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBalance } from '../services/api';
import { ArrowRightLeft, PlusCircle, List } from 'lucide-react';

const Dashboard = ({ user }) => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await getBalance();
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Failed to fetch balance', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBalance();
  }, []);

  return (
    <div className="page-container">
      <div style={{ width: '100%', maxWidth: '800px', marginBottom: '2rem' }}>
        <h2>Hello, {user?.email?.split('@')[0] || 'User'}!</h2>
      </div>

      <div className="glass-container balance-card" style={{ width: '100%', maxWidth: '800px' }}>
        <p>Total Balance</p>
        <div className="balance-amount">
          {loading ? '...' : `$${balance.toFixed(2)}`}
        </div>
      </div>

      <div className="action-grid">
        <Link to="/add" style={{ textDecoration: 'none' }}>
          <div className="glass-container" style={{ textAlign: 'center', transition: 'transform 0.2s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <PlusCircle size={32} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Add Money</h3>
            <p style={{ fontSize: '0.875rem' }}>Top up your wallet</p>
          </div>
        </Link>

        <Link to="/send" style={{ textDecoration: 'none' }}>
          <div className="glass-container" style={{ textAlign: 'center', transition: 'transform 0.2s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <ArrowRightLeft size={32} color="var(--danger)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Send Money</h3>
            <p style={{ fontSize: '0.875rem' }}>Transfer to a friend</p>
          </div>
        </Link>

        <Link to="/transactions" style={{ textDecoration: 'none' }}>
          <div className="glass-container" style={{ textAlign: 'center', transition: 'transform 0.2s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <List size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>History</h3>
            <p style={{ fontSize: '0.875rem' }}>View transactions</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
