import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, LogIn } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate successful auth natively 
      onLogin({ email });
      navigate('/');
    } catch (err) {
      console.error('Login error', err);
      setError('Failed to login. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="glass-container" style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Wallet color="var(--primary)" size={48} style={{ marginBottom: '1rem' }} />
        <h2 style={{ textAlign: 'center' }}>Welcome Back</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Sign in to your Mini Wallet</p>
        
        {error && <div className="message message-error">{error}</div>}
        
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '1rem' }}>
            <LogIn size={18} />
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
