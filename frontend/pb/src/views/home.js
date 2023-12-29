// /src/pages/Home.js
import React from 'react';
import { useAuth } from '../services/authService';
/* import AdminDashboard from '../components/dashboard/AdminDashboard';
import UserDashboard from '../components/dashboard/UserDashboard'; */

const Home = () => {
  const { isAdmin } = useAuth();

  return (
    <div>
      {isAdmin ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Home;