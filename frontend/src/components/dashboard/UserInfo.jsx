import React from 'react';

function UserInfo({ userNombre, userType, userHabitacion, userPiso }) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-6 shadow-xl">
      <h3 className="text-xl font-semibold mb-4">Información del Usuario</h3>
      <p><strong>Nombre:</strong> {userNombre}</p>
      <p><strong>Tipo de Usuario:</strong> {userType === 'administrador' ? 'Administrador' : 'Residente'}</p>
      {userType === 'residente' && <p><strong>Habitacion:</strong> {userHabitacion}</p>}
      {userType === 'residente' && <p><strong>Piso:</strong> {userPiso}</p>}
    </div>
  );
}

export default UserInfo;