import React from 'react';

function WelcomeMessage({ userNombre, userType }) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-6 shadow-xl">
      <h2 className="text-3xl font-bold">
        Bienvenido, {userType === 'administrador' ? 'Administrador' : 'Residente'} {userNombre}
      </h2>
      <p className="mt-2 text-gray-300">
        Centro de Control.
      </p>
    </div>
  );
}

export default WelcomeMessage;