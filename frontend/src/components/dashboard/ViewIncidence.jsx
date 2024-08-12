import React, { useEffect, useState } from 'react';
import DashboardHeader from './DashboardHeader';
import { Link } from 'wouter';
import axios from 'axios';
import { useUser } from '../../services/UserContext';
import { IoIosArrowDropleft } from 'react-icons/io';

const ViewIncidencias = ({ userType, userId }) => {
  const { user } = useUser();
  const [incidencias, setIncidencias] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  const fetchIncidencias = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get('http://localhost:3000/api/incidencias', config);

      if (Array.isArray(response.data)) {
        setIncidencias(response.data);
      } else {
        setIncidencias([]);
      }
    } catch (error) {
      if (error.response) {
        console.error('Datos de la respuesta de error:', error.response.data);
        console.error('Estado de la respuesta de error:', error.response.status);
      }
      setError(`Error al obtener incidencias: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidencias();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta incidencia?')) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.delete(`http://localhost:3000/api/incidencias/${id}`, config);
        // Refrescar la lista de incidencias después de eliminar
        fetchIncidencias();
      } catch (error) {
        console.error('Error al eliminar la incidencia:', error.message);
      }
    }
  };

  if (loading) {
    return <div className="p-4 text-white">Cargando...</div>; // Mensaje de carga
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white bg-opacity-10 text-white relative">
      <div className="relative z-10">
        <DashboardHeader />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="mt-6 flex justify-start mb-6">
            <Link href="/dashboard" className="text-white hover:text-gray-300">
              <IoIosArrowDropleft className="text-5xl" />
            </Link>
          </div>

          <div className=" mx-auto p-6 ">
            <h1 className="text-3xl font-semibold mb-4">Lista de Incidencias</h1>
            {incidencias.length === 0 ? (
              <p className="text-white">No hay incidencias para mostrar.</p>
            ) : (
              <table className="w-full text-gray-900 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-purple-800 via-orange-700 to-purple-800 text-white">
                  <tr>
                    <th className="p-2 text-left">ID</th>
                    <th className="p-2 text-left">Asunto</th>
                    <th className="p-2 text-left">Descripción</th>
                    <th className="p-2 text-left">Ubicación</th>
                    <th className="p-2 text-left">Tipo</th>
                    <th className="p-2 text-left">Estado</th>
                    <th className="p-2 text-left">Creado</th>
                    <th className="p-2 text-left">Actualizado</th>
                    <th className="p-2 text-left">Imágenes</th>
                    <th className="p-2 text-left">Acciones</th>
                    <th className="p-2 text-left">Eliminar</th>
                  </tr>
                </thead>
                <tbody className='bg-white bg-opacity-30 border border-black border-opacity-40 text-black'>
                  {incidencias.map((incidencia) => (
                    <tr key={incidencia.id} className="border-b border-black border-opacity-40">
                      <td className="p-4">{incidencia.id}</td>
                      <td className="p-4 border-x border-black border-opacity-40">{incidencia.asunto}</td>
                      <td className="p-4 border-x border-black border-opacity-40">{incidencia.descripcion}</td>
                      <td className="p-4 border-x border-black border-opacity-40">{incidencia.ubicacion}</td>
                      <td className="p-4 border-x border-black border-opacity-40">{incidencia.tipo}</td>
                      <td className="p-4 border-x border-black border-opacity-40">
                        <span className={`inline-block w-3 h-3 rounded-full ${incidencia.estado === 'en proceso' ? 'bg-yellow-500' :
                          incidencia.estado === 'pendiente' ? 'bg-green-500' :
                            incidencia.estado === 'resuelto' ? 'bg-red-500' : 'bg-red-500'
                          } mr-2 inline-flex`}></span>
                        {incidencia.estado}
                      </td>
                      <td className="p-4 border-x border-black border-opacity-40">{new Date(incidencia.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 border-x border-black border-opacity-40">{new Date(incidencia.updatedAt).toLocaleDateString()}</td>
                      <td className="p-4 border-x border-black border-opacity-40">
                        {incidencia.imagenes && incidencia.imagenes.length > 0 ? (
                          incidencia.imagenes.map((img, index) => (
                            <img key={index} src={img} alt={`Imagen ${index + 1}`} className="w-12 h-12 object-cover rounded-lg" />
                          ))
                        ) : (
                          'no hay imagenes'
                        )}
                      </td>
                      <td className="p-4 border-x border-black border-opacity-40">
                        <Link
                          href={`/actualizar-datos/${incidencia.id}`}
                          className="block w-full text-green-900 text-center py-3 rounded-lg font-medium transition duration-300"
                        >
                          Actualizar
                        </Link>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleEliminar(incidencia.id)}
                          className="block w-full text-red-800 text-center py-3 rounded-lg font-medium transition duration-300"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ViewIncidencias;
