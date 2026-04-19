import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendMoney } from '../services/api';
import { ArrowRightLeft } from 'lucide-react';

const SendMoney = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSend = async (e) => {
    e.preventDefault();
    if (!email || !amount || parseFloat(amount) <= 0) {
      setMessage({ text: 'Please enter a valid email and amount', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      await sendMoney(email, amount);
      setMessage({ text: `Successfully sent $${amount} to ${email}!`, type: 'success' });
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      setMessage({ text: error.message || 'Failed to send money', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="glass-container" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowRightLeft color="var(--danger)" /> Send Money
        </h2>
        
        {message.text && (
          <div className={`message message-${message.type}`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSend}>
          <div className="form-group">
            <label>Recipient Email</label>
            <input 
              type="email" 
              placeholder="friend@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Amount ($)</label>
            <input 
              type="number" 
              step="0.01"
              placeholder="0.00" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          
          <button type="submit" className="btn btn-danger" disabled={loading}>
            {loading ? 'Processing...' : 'Send Transfer'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMoney;
