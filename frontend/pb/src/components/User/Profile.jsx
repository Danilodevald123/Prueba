import React from 'react';

const Profile = ( {userss}) => {
  console.log(userss)
  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Perfil de Usuario</h2>
      <p className="mb-2">¡Bienvenido, {userss.nombre}!</p>
    </div>
  );
};

export default Profile;