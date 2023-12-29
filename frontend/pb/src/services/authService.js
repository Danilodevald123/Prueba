import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';



export const Login = (setUserData,formData,tipoAccion) => {
  console.log(tipoAccion)
  const MySwal = withReactContent(Swal)
  axios.post("http://localhost:3030/auth/sso", 
    formData
  ).then((res) => {
      const data = res.data;
      console.log(data.rol)

        // console.log(data)
      if (data) {
        
        setUserData(data)
        localStorage.setItem('data sesiom', JSON.stringify(data));

        if (data.rol === "usuario") {
          // Redireccionar a la ruta de usuario
          window.location.href = "/usuario";
        } else if (data.rol === "admin") {
          // Redireccionar a la ruta de admin
          window.location.href = "/admin";
        }

        MySwal.fire({
          title: "<p>Guardado correctamente</p>",
          target: document.getElementById('form_login'),
          icon: "success",
          text: "Datos de la funcion del cargo guardado correctamente",
          confirmButtonText: "Aceptar",
        })
      } else {

        MySwal.fire({
          target: document.getElementById('form_login'),
          title: "<p>Atención</p>",
          icon: "error",
          text: "Error al guardar la funcion del cargo",
          confirmButtonText: "Aceptar",
        });
      }

    })
    .catch((e) => {
      console.log({e})
      console.log(tipoAccion)
      if(tipoAccion === "registro"){
        const error = (e.response.data.error)
        MySwal.fire({
          target: document.getElementById('form_login') ,
          icon: "error",
          text: error ? error : "el email ya existexxx",
        });
      } else {
      const errorr = "la contraseña no coincide"
      const error = (e.response.data.error)
      MySwal.fire({
        target: document.getElementById('form_login') ,
        icon: "error",
        text: error ? error : errorr,
      });
      }
    });
}