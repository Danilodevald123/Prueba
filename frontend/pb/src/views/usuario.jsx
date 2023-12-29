import React, { useEffect, useState } from 'react';
import Profile from '../components/User/Profile';
import axios from 'axios';

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import Modal from '../components/Dashboard/ModalModificarUsuario';
import Perfil from '../components/User/Perfil';



const Usuario = () => {
  // Supongamos que obtienes la información del usuario desde algún lugar
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [userss,setUserss] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [id, setId] = useState("");
  const MySwal = withReactContent(Swal)
  const [change,setChange] = useState(false)




  
  const [showConceptos, setShowConceptos] = useState(false);


  const ocultarConceptos = () => {
    setShowConceptos(false);
  };

  

  const handleModificarClick = () => {
    setShowConceptos(true);
    
  };









  useEffect(() => {
    const loggerUserJSON = window.localStorage.getItem('data sesiom');
    if (loggerUserJSON) {
      const user = JSON.parse(loggerUserJSON);
      setUserData(user);
      setAccessToken(user.accessToken)
      setId(user.id)
      fetchData(user.id, user.accessToken)
     
    } else {
      console.log("no hay usuario");
    }
  }, [change]);
  console.log()
  console.log(userss,"aca esta el usuario loggeado papurriiiiii")
  

  


  const fetchData = (id, accessToken) => {
    axios.get("http://localhost:3030/user/usuario/" + id, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setUserss(res.data);
      })
      .catch((error) => {
        if (error.response) {
          MySwal.fire({
            title: "<p>Atención</p>",
            icon: "error",
            text: "Hubo un error al intentar cargar los usuariossssssss. Verifique su conexión ",
            confirmButtonText: "Aceptar",
          }).then(() => {
            return "";
          });
        }
      });
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Vista de Usuario</h1>
      <Profile userss= {userss} />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-700"
        onClick={() => handleModificarClick()}
      >
        Modificar mis datos
      </button>

      <Modal isOpen={showConceptos} onClose={ocultarConceptos} >
        <div className="p-4">
         <Perfil user={userss} token={accessToken} setChange={setChange} />
        </div>
      </Modal>
      
    </div>
    
  );
};

export default Usuario;