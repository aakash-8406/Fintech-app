import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddMoney from './pages/AddMoney';
import SendMoney from './pages/SendMoney';
import Transactions from './pages/Transactions';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated via Mock local state
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('miniwallet_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.log('Not authenticated');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('miniwallet_user', JSON.stringify(userData));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('miniwallet_user');
  };

  if (loading) {
    return <div className="page-container"><h2>Loading...</h2></div>;
  }

  return (
    <Router>
      <div className="app-container">
        <Navbar isAuthenticated={!!user} onSignOut={handleSignOut} />
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute isAuthenticated={!!user}>
                <Dashboard user={user} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add" 
            element={
              <ProtectedRoute isAuthenticated={!!user}>
                <AddMoney />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/send" 
            element={
              <ProtectedRoute isAuthenticated={!!user}>
                <SendMoney />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transactions" 
            element={
              <ProtectedRoute isAuthenticated={!!user}>
                <Transactions />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
