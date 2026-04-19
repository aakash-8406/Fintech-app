import { Link, useNavigate } from 'react-router-dom';
import { Wallet, LogOut, ArrowRightLeft, PlusCircle, LayoutDashboard } from 'lucide-react';

const Navbar = ({ isAuthenticated, onSignOut }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      onSignOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="glass-nav">
      <div className="app-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--text-main)' }}>
          <Wallet color="var(--primary)" size={28} />
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Mini<span style={{ color: 'var(--primary)' }}>Wallet</span></h2>
        </Link>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><LayoutDashboard size={18} /> Home</Link>
          <Link to="/add" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><PlusCircle size={18} /> Add</Link>
          <Link to="/send" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><ArrowRightLeft size={18} /> Send</Link>
          <Link to="/transactions" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Transactions</Link>
          <button onClick={handleLogout} className="btn btn-icon" style={{ background: 'transparent', padding: '0.5rem', width: 'auto', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
