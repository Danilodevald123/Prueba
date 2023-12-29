import React from 'react';
import Register from '../components/Auth/Register';

/**
 * Componente funcional para la página de registro.
 *
 * @component
 * @returns {JSX.Element} Elemento JSX que representa la página de registro.
 */
const Registerr = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="flex items-center justify-center h-screen">
        {/* Renderiza el componente de registro */}
        <Register />
      </div>
    </div>
  );
};

export default Registerr;
