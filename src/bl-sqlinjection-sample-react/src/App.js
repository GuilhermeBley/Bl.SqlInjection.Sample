// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/NavBar';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

   return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar 
          isAuthenticated={isAuthenticated} 
          user={user} 
          logout={logout} 
        />
        <Routes>
          <Route path="/" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}> 
                <DashBoard />
              </ProtectedRoute>
          } />
          <Route 
            path="/login" 
            element={<Login onLogin={login} />} 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}> 
                <DashBoard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;