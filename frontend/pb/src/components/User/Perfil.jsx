
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as userService from "../../services/userService";

const Perfil = ({ user, token, setChange }) => {
  const [contrasenasCoinciden, setContrasenasCoinciden] = useState(true);
  const [file, setFile] = useState(null);
  const tokenn = token

  const formik = useFormik({
    initialValues: {
      email: user.email || "",
      contrasena: "",
      contrasenaRepetida: "",
      nombre: user.nombre || "",
      apellido: user.apellido || "",
      fechaNacimiento: user.fechaNacimiento
        ? user.fechaNacimiento.slice(0, 10)
        : "",
      dni: user.dni || "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Correo electrónico inválido")
        .required("Campo requerido"),
      contrasena: Yup.string().min(
        6,
        "La contraseña debe tener al menos 6 caracteres"
      ),
      contrasenaRepetida: Yup.string().oneOf(
        [Yup.ref("contrasena"), null],
        "Las contraseñas deben coincidir"
      ),
      nombre: Yup.string().required("Campo requerido"),
      apellido: Yup.string().required("Campo requerido"),
      fechaNacimiento: Yup.date().required("Campo requerido"),
      dni: Yup.string().required("Campo requerido"),
    }),
    
  });


  const submitHandler = (e) => {
    try {
      
      userService.EditarEmpleado(formik.values, setChange, tokenn , () => setShowForm(false));
      e.preventDefault();
     
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  }
  

  console.log(formik.values)

  useEffect(() => {
    formik.setValues({
      ...user,
      fechaNacimiento: user.fechaNacimiento
        ? user.fechaNacimiento.slice(0, 10)
        : "",
      contrasena: "",
    });
  }, [user]);

  return (
    <div id="form_modificar_usuario" className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Modificar Perfil</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="col-span-full">
          <label
            htmlFor="archivo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Foto de perfil
          </label>
          <div className="mt-2 flex items-center gap-x-3">
            {formik.values.fotoPerfil ? (
              <img
                src={"src/htdocs/" + formik.values.fotoPerfil}
                alt="Perfil"
                className="h-16 w-16 rounded-full object-cover"
                onError={(e) => {
                  console.error("Error al cargar la foto:", e);
                }}
              />
            ) : (
              <svg
                className="h-12 w-12 text-gray-300"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                {/* SVG path */}
              </svg>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className={`border p-2 w-full ${formik.touched.email && formik.errors.email ? "border-red-500" : ""}`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="contrasena"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={formik.values.contrasena}
            onChange={formik.handleChange}
            className={`border p-2 w-full ${formik.touched.contrasena && formik.errors.contrasena ? "border-red-500" : ""}`}
          />
          {formik.touched.contrasena && formik.errors.contrasena && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.contrasena}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="contrasenaRepetida"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Repetir Contraseña
          </label>
          <input
            type="password"
            id="contrasenaRepetida"
            name="contrasenaRepetida"
            value={formik.values.contrasenaRepetida}
            onChange={formik.handleChange}
            className={`border p-2 w-full ${formik.touched.contrasenaRepetida && formik.errors.contrasenaRepetida ? "border-red-500" : ""}`}
          />
          {formik.touched.contrasenaRepetida && formik.errors.contrasenaRepetida && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.contrasenaRepetida}</p>
          )}
          {!contrasenasCoinciden && (
            <p className="text-red-500 text-xs mt-1">
              Las contraseñas no coinciden
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="nombre"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            className={`border p-2 w-full ${formik.touched.nombre && formik.errors.nombre ? "border-red-500" : ""}`}
          />
          {formik.touched.nombre && formik.errors.nombre && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.nombre}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="apellido"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Apellido
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formik.values.apellido}
            onChange={formik.handleChange}
            className={`border p-2 w-full ${formik.touched.apellido && formik.errors.apellido ? "border-red-500" : ""}`}
          />
          {formik.touched.apellido && formik.errors.apellido && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.apellido}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="fechaNacimiento"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={formik.values.fechaNacimiento}
            onChange={formik.handleChange}
            className={`border p-2 w-full ${formik.touched.fechaNacimiento && formik.errors.fechaNacimiento ? "border-red-500" : ""}`}
          />
          {formik.touched.fechaNacimiento && formik.errors.fechaNacimiento && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.fechaNacimiento}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="dni"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            DNI
          </label>
          <input
            type="text"
            id="dni"
            name="dni"
            value={formik.values.dni}
            onChange={formik.handleChange}
            className={`border p-2 w-full ${formik.touched.dni && formik.errors.dni ? "border-red-500" : ""}`}
          />
          {formik.touched.dni && formik.errors.dni && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.dni}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          disabled={!contrasenasCoinciden}
          onClick={submitHandler}
          
        >
          Modificar
        </button>
      </form>
    </div>
  );
};

export default Perfil;
