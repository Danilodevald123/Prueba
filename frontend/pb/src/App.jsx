import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Auth/Login";
import Inicio from "./views/inicio";
import Register from "./components/Auth/Register";
import Registerr from "./views/register";
import Usuario from "./views/usuario";
import PerfilData from "./views/PerfilData";
import Admin from "./views/admin";



function App() {
 return ( 
 <Router>
  <div>
    <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/register" element={<Registerr/>} />
        <Route path="/usuario" element={<Usuario/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/PerfilData" element={<PerfilData/>} />
    </Routes> 
  </div>
</Router>
  );
}

export default App;
