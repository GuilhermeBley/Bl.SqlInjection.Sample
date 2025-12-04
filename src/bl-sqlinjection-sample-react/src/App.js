// App.js
import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/NavBar';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import { AuthProvider } from './context/authContext';

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

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            } />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashBoard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;