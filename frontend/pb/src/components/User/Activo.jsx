// Activo.js
import Swal from "sweetalert2";
import axios from "axios";
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal)
import React, { useState } from 'react';

const Activo = ({ user, token, setChange}) => {

  const [activo, setActivo] = useState(user.activo);


  const handleChangeActivo = () => {
    // Determinar la URL del endpoint según el estado activo actual
    const endpoint = activo 
      ? "http://localhost:3030/users/desactivar/" + user.id
      : "http://localhost:3030/users/activar/" +  user.id

    // Realizar la solicitud al servidor para activar o desactivar el usuario

    axios.put(endpoint, {},{
        headers: {
            
          Authorization: `Bearer ${token}`,
        },
      }
      ).then((res) => {
        if (res.data) {
            setChange(true); 
          MySwal.fire({
            target: document.getElementById('form_Activo'),
            title: "<p>Usuario modificado correctamente</p>",
            icon: "success",
            text: "Datos del usuario modificado correctamente.",
            confirmButtonText: "Aceptar",
          }).then((result) =>{
             if (result.isConfirmed){
                setChange(true); 
            } 
          });
        } else {
          MySwal.fire({
            target: document.getElementById('form_Activo'),
            title: "<p>Atención</p>",
            icon: "error",
            text: "Hubo un error ",
            confirmButtonText: "Aceptar",
          })
        }
      })
      .catch((e) => {
        MySwal.fire({
          target: document.getElementById('form_Activo'),
          icon: "error",
          text: "Ha ocurrido un error x",
        });
      });;
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Modificar Estado</h1>
      <form id="form_Activo">
        <div  className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Usuario ID: {user.id}
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Activar/Desactivar
          </label>
          <select
            className="border rounded w-full py-2 px-3"
            value={activo}
            onChange={(e) => setActivo(e.target.value)}
          >
            <option value={true}>Desactivar</option>
            <option value={false}>Activar</option>
          </select>
        </div>
        <div className="flex items-center justify-end">
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleChangeActivo}
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Activo;
