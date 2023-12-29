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



function App() {
  const [userData,setUserData] = useState("")
  const MySwal = withReactContent(Swal)
  
  useEffect(()=>{
    const loggerUserJSON = window.localStorage.getItem('data sesiom');
    if (loggerUserJSON) {
      const user = JSON.parse(loggerUserJSON);
      setUserData(user);
    } 
  }, [])
  



 return ( 
 <Router>
  <div>
    <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/register" element={<Registerr/>} />
        <Route path="/usuario" element={<Usuario/>} />
        
        <Route path="/PerfilData" element={<PerfilData/>} />



        {userData.rol === "admin" ? (
          <>
            <Route path="/admin" element={<Admin/>} />
          </>
        ) : (
          <Route path="*" element={<Inicio/>} /> 
        )  }

    </Routes> 
  </div>
</Router>




  );
}

export default App;
