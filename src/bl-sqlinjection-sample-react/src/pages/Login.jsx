import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  // Simple user database (in real app, this would be an API call)
  const users = [
    { username: 'admin', password: 'admin123', name: 'Administrator' },
    { username: 'user', password: 'user123', name: 'Regular User' },
    { username: 'john', password: 'doe123', name: 'John Doe' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Find user in our "database"
      const user = users.find(
        u => u.username === username && u.password === password
      );

      if (user) {
        // Login successful
        onLogin({
          username: user.username,
          name: user.name,
          loginTime: new Date().toLocaleString()
        });
        
        // Redirect to intended page or dashboard
        navigate(from, { replace: true });
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (demoUsername, demoPassword) => {
    setUsername(demoUsername);
    setPassword(demoPassword);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login to Your Account</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={loading || !username || !password}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Demo credentials for testing */}
        <div className="demo-credentials">
          <h4>Demo Accounts:</h4>
          <div className="demo-buttons">
            <button 
              onClick={() => handleDemoLogin('admin', 'admin123')}
              className="demo-btn"
            >
              Use Admin Account
            </button>
            <button 
              onClick={() => handleDemoLogin('user', 'user123')}
              className="demo-btn"
            >
              Use User Account
            </button>
            <button 
              onClick={() => handleDemoLogin('john', 'doe123')}
              className="demo-btn"
            >
              Use John's Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;