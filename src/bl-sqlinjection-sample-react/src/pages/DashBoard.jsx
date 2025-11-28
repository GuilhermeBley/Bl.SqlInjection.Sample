// components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ user }) => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="welcome-message">
        <h2>Welcome back, {user?.name}!</h2>
        <p>You logged in at: {user?.loginTime}</p>
      </div>
      
      <div className="dashboard-cards">
        <div className="card">
          <h3>Quick Actions</h3>
          <ul>
            <li><Link to="/profile">View Profile</Link></li>
            <li><Link to="/contact">Contact Support</Link></li>
          </ul>
        </div>
        
        <div className="card">
          <h3>Recent Activity</h3>
          <p>You have successfully logged into the system.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;