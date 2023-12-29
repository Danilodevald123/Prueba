// App.js
import React from 'react';
import Login from '../components/Auth/Login';

const Inicio = () => {


  return (
    <div className="min-h-screen bg-gray-200">
      <div className="flex items-center justify-center h-screen">
        <Login/>
      </div>
    </div>
  );
};

export default Inicio;