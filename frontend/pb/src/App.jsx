import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Auth/Login";
import Inicio from "./views/inicio";
import Register from "./components/Auth/Register";
import Registerr from "./views/register";
import Usuario from "./views/usuario";
import PerfilData from "./views/PerfilData";
import Admin from "./views/admin";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import { useEffect, useState } from "react";

/**
 * Componente principal de la aplicación.
 * 
 * @function App
 * @returns {JSX.Element} Elemento JSX que representa la aplicación.
 */
function App() {
  // Estado para almacenar los datos del usuario.
  const [userData, setUserData] = useState("");

  // Instancia de SweetAlert2 para utilizar en la aplicación.
  const MySwal = withReactContent(Swal);

  /**
   * Efecto secundario que se ejecuta después de que el componente se monta.
   * Verifica si hay datos de usuario almacenados en el almacenamiento local y los carga en el estado.
   * 
   * @function useEffect
   * @memberof App
   */
  useEffect(() => {
    const loggerUserJSON = window.localStorage.getItem('data sesiom');
    if (loggerUserJSON) {
      const user = JSON.parse(loggerUserJSON);
      setUserData(user);
    }
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          {/* Rutas de la aplicación */}
          <Route path="/" element={<Inicio />} />
          <Route path="/register" element={<Registerr />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/PerfilData" element={<PerfilData />} />

          {/* Ruta condicional para administradores */}
          {userData.rol === "admin" ? (
            <>
              <Route path="/admin" element={<Admin />} />
            </>
          ) : (
            <Route path="*" element={<Inicio />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
