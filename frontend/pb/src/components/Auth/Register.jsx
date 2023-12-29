import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as authService from '../../services/authService';

const Register = () => {
    const [file, setFile] = useState(null);
    const tipoAccion = "registro"

    const [userData,setUserData] = useState("");
  const formik = useFormik({
    initialValues: {
      email: '',
      contrasena: '',
      nombre: '',
      apellido: '',
      fechaNacimiento: '',
      dni: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Correo electrónico inválido, debe contener @').required('Campo requerido'),
      contrasena: Yup.string().required('Campo requerido').min(6, 'La contraseña debe tener al menos 6 caracteres'),
      nombre: Yup.string().required('Campo requerido'),
      apellido: Yup.string().required('Campo requerido'),
      fechaNacimiento: Yup.date().required('Campo requerido'),
      dni: Yup.number().required('Campo requerido').positive("El DNI tiene que ser postivo").min(10000000, 'El DNI debe contener al menos 8 numeros').max(99999999, 'El DNI debe contener hasta 8 numeros'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formDataWithFile = new FormData();
        formDataWithFile.append('nombre', values.nombre);
        formDataWithFile.append('apellido', values.apellido);
        formDataWithFile.append('email', values.email);
        formDataWithFile.append('dni', values.dni);
        formDataWithFile.append('fechaNacimiento', values.fechaNacimiento);
        formDataWithFile.append('contrasena', values.contrasena);

        // Añade el archivo al formulario solo si se seleccionó uno
        if (file) {
          formDataWithFile.append('fotoPerfil', file);
        }
        await authService.Login(setUserData, formDataWithFile, tipoAccion);
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      }
    },
  });





  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div id="form_login" className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Registrarse
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="archivo" className="block text-sm font-medium leading-6 text-gray-900">
              Foto de perfil
            </label>
            <div className="mt-2">
              <input
                id="archivo"
                name="archivo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
              Nombre
            </label>
            <div className="mt-2">
              <input
                id="nombre"
                name="nombre"
                type="text"
                autoComplete="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  formik.touched.nombre && formik.errors.nombre ? 'border-red-500' : ''
                }`}
              />
              {formik.touched.nombre && formik.errors.nombre ? (
                <p className="mt-2 text-sm text-red-500">{formik.errors.nombre}</p>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="apellido" className="block text-sm font-medium leading-6 text-gray-900">
              Apellido
            </label>
            <div className="mt-2">
              <input
                id="apellido"
                name="apellido"
                type="text"
                autoComplete="apellido"
                value={formik.values.apellido}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  formik.touched.apellido && formik.errors.apellido ? 'border-red-500' : ''
                }`}
              />
              {formik.touched.apellido && formik.errors.apellido ? (
                <p className="mt-2 text-sm text-red-500">{formik.errors.apellido}</p>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                }`}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="mt-2 text-sm text-red-500">{formik.errors.email}</p>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="dni" className="block text-sm font-medium leading-6 text-gray-900">
              DNI
            </label>
            <div className="mt-2">
              <input
                id="dni"
                name="dni"
                type="number"
                autoComplete="dni"
                value={formik.values.dni}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  formik.touched.dni && formik.errors.dni ? 'border-red-500' : ''
                }`}
              />
              {formik.touched.dni && formik.errors.dni ? (
                <p className="mt-2 text-sm text-red-500">{formik.errors.dni}</p>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="fechaNacimiento" className="block text-sm font-medium leading-6 text-gray-900">
              Fecha De Nacimiento
            </label>
            <div className="mt-2">
              <input
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="date"
                autoComplete="fechaNacimiento"
                value={formik.values.fechaNacimiento}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  formik.touched.fechaNacimiento && formik.errors.fechaNacimiento ? 'border-red-500' : ''
                }`}
              />
              {formik.touched.fechaNacimiento && formik.errors.fechaNacimiento ? (
                <p className="mt-2 text-sm text-red-500">{formik.errors.fechaNacimiento}</p>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="contrasena" className="block text-sm font-medium leading-6 text-gray-900">
              Contraseña
            </label>
            <div className="mt-2">
              <input
                id="contrasena"
                name="contrasena"
                type="password"
                autoComplete="current-password"
                value={formik.values.contrasena}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  formik.touched.contrasena && formik.errors.contrasena ? 'border-red-500' : ''
                }`}
              />
              {formik.touched.contrasena && formik.errors.contrasena ? (
                <p className="mt-2 text-sm text-red-500">{formik.errors.contrasena}</p>
              ) : null}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={formik.isSubmitting}
              
            >
              Registrar
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          ¿Ya tienes cuenta?{' '}
          <a href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;