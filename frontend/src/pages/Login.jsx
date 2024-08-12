import React, { useState } from 'react';
import { Redirect } from 'wouter';
import { useUser } from '../services/UserContext';

function Login() {
  const { login, user } = useUser(); // Asegúrate de tener acceso a user desde useUser

  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, contraseña); // Enviar email y contraseña
      setRedirectToDashboard(true); // Establecer redirectToDashboard en true al iniciar sesión correctamente
    } catch (error) {
      console.error('Login error:', error);
      setError('Error en el inicio de sesión. Por favor, verifica tus credenciales.'); // Manejar errores de inicio de sesión
    }
  };

  // Redirigir a Dashboard si redirectToDashboard es true
  if (user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    //contenedor login principal
    <div className="relative z-10 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-2xl">
      {/* header login */}
      <div className="text-center mb-8">
        <img src="/logodashboard.png" alt="hotel zarate" className="h-20 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white">Reportes de Incidencias</h2>
      </div>
      {/* cuerpo de login */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-white mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="tu@email.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-white mb-1">Contraseña</label>
          <input
            type="password"
            id="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="w-full px-4 py-3 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="••••••••"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
              Recordarme
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-orange-500 hover:to-purple-600 rounded-lg text-white font-bold shadow-lg transition duration-300 transform hover:-translate-y-1"
        >
          Ingresar
        </button>
      </form>
    </div>

  );
}

export default Login;
