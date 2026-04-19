import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMoney } from '../services/api';
import { PlusCircle } from 'lucide-react';

const AddMoney = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setMessage({ text: 'Please enter a valid amount', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      await addMoney(amount);
      setMessage({ text: `Successfully added $${amount} to your wallet!`, type: 'success' });
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      setMessage({ text: 'Failed to add money', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="glass-container" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PlusCircle color="var(--secondary)" /> Add Money
        </h2>
        
        {message.text && (
          <div className={`message message-${message.type}`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleAdd}>
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
          
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? 'Processing...' : 'Confirm Deposit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMoney;
