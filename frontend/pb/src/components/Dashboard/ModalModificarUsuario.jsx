import React from 'react';


const Modal = ({ isOpen, onClose, children}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
          <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-xl font-bold cursor-pointer"
            >
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;