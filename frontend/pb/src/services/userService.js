// /src/services/userService.js
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal)



export const EditarEmpleado = (formData, setChange , token) => {
  axios.put("http://localhost:3030/user/modificar/" + formData.id, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  ).then((res) => {
    if (res.data) {
      MySwal.fire({
        target: document.getElementById('form_modificar_usuario'),
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
        target: document.getElementById('form_modificar_usuario'),
        title: "<p>Atención</p>",
        icon: "error",
        text: "Hubo un error ",
        confirmButtonText: "Aceptar",
      })
    }
  })
  .catch((e) => {
    MySwal.fire({
      target: document.getElementById('form_modificar_usuario'),
      icon: "error",
      text: "Ha ocurrido un error x",
    });
  });;
};