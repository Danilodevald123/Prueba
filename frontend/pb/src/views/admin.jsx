import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from '../components/Dashboard/UserTable';
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';


const Admin = () => {
  const [userData, setUserData] = useState(null);
  const [userss, setUserss] = useState([]);
  const [tokenn, setTokenn] = useState("");
  const [change,setChange] = useState(false)
  const MySwal = withReactContent(Swal);





  useEffect(() => {
    const loggerUserJSON = window.localStorage.getItem('data sesiom');
    if (loggerUserJSON) {
      const user = JSON.parse(loggerUserJSON);
      setUserData(user);
      setTokenn(user.accessToken)

    } 
  }, []);

  const fetchData = async () => {
    
    axios.get('http://localhost:3030/users/usuarios', {
      headers: {
        Authorization: `Bearer ${userData.accessToken}`,
      },
    })
      .then((res) => {
        setUserss(res.data);
      })
      .catch((error) => {
        if (error.response) {
          MySwal.fire({
            title: "<p>Atención</p>",
            icon: "error",
            text: "Hubo un error al intentar cargar los usuarios. Verifique su conexión ",
            confirmButtonText: "Aceptar",
          }).then(() => {
            return "";
          });
        }
      });
  };

  useEffect(() => {
    const fetchDataAndResetChange = async () => {
      if (userData) {
        await fetchData();
        setChange(false);
      }
    };
  
    fetchDataAndResetChange();
  }, [userData, change]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">Vista de Admin</h1>
      <div className="max-w-screen-md w-full">
        <UserTable users={userss} token={tokenn} setChange={setChange} />
      </div>
    </div>
  );
};

export default Admin;
