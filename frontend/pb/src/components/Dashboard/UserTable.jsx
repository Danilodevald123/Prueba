import React, { useState } from 'react';
import Modal from './ModalModificarUsuario';
import Perfil from '../User/Perfil';
import Activo from '../User/Activo';

const UserTable = ({ users, token, setChange }) => {
  const [changeIcon,setChangeIcon] = useState(false)
  const [selectedUser, setSelectedUser] = useState({});
  const [showConceptos, setShowConceptos] = useState(false);
  const [showActivo, setShowActivo] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const ocultarConceptos = () => {
    setShowConceptos(false);
  };
  const ocultarActivos = () => {
    setShowActivo(false);
  };

  const handleLogoClick = (user) => {
    setSelectedUser(user);
    setShowConceptos(true);
  };

  const handleActivoclick = (user) => {
    setSelectedUser(user);
    setShowActivo(true);
  };

  const getStatusIcon = (isActive) => {
    return isActive ? (
      <svg
        className="h-6 w-6 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    ) : (
      <svg
        className="h-6 w-6 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Apellido
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rol
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Detalle
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((user, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{user.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.apellido}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.rol}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleActivoclick(user)}>
                  {getStatusIcon(user.activo)}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleLogoClick(user)}>
                  <svg
                    className="h-8 w-8 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              {Array.from({ length: Math.ceil(users.length / itemsPerPage) }).map((_, index) => (
                <a
                  key={index}
                  href="#"
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold 
                    ${currentPage === index + 1 ? 'bg-indigo-600 text-white focus:z-20 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'}`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <Modal isOpen={showConceptos} onClose={ocultarConceptos}>
        <div className="p-4">
          <Perfil user={selectedUser} token={token} setChange={setChange} />
        </div>
      </Modal>

      <Modal isOpen={showActivo} onClose={ocultarActivos}>
        <div className="p-4">
          <Activo user={selectedUser} token={token} setChange={setChange} />
        </div>
      </Modal>
    </div>
  );
};

export default UserTable;



