import React from 'react';
import { useLocation, useRoute } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchIncidenciaById, updateIncidencia } from '../api/fetchIncidencias';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { Link } from 'wouter';
import { IoIosArrowDropleft } from 'react-icons/io';

const UpdateIncUser = () => {
  const [, params] = useRoute('/actualizar-datos/:id');
  const incidenciaId = params?.id;
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();

  // Fetch incidencia by ID
  const { data: incidencia, error: fetchError, isLoading } = useQuery({
    queryKey: ['incidencia', incidenciaId],
    queryFn: () => fetchIncidenciaById(incidenciaId),
    enabled: Boolean(incidenciaId),
  });

  // Mutation to update incidencia
  const updateMutation = useMutation({
    mutationKey: ['updateIncidencia', incidenciaId],
    mutationFn: (formData) => updateIncidencia(incidenciaId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(['incidencia', incidenciaId]);
      alert('Incidencia actualizada exitosamente');
      navigate('/ver-incidencias')
    },
    onError: (error) => {
      console.error('Error al actualizar la incidencia:', error);
      alert('Error al actualizar la incidencia');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!incidenciaId) {
      console.error('ID de incidencia no disponible');
      return;
    }

    const formData = new FormData();
    const fileInput = e.target.imagenes;

    for (let i = 0; i < fileInput.files.length; i++) {
      formData.append('imagenes', fileInput.files[i]);
    }

    formData.append('asunto', e.target.asunto.value);
    formData.append('descripcion', e.target.descripcion.value);
    formData.append('tipo', e.target.tipo.value);
    formData.append('estado', e.target.estado.value);
    formData.append('ubicacion', e.target.ubicacion.value);

    try {
      await updateMutation.mutateAsync(formData);
    } catch (error) {
      console.error('Error al actualizar la incidencia:', error);
    }
  };

  if (fetchError) return <div>Error al cargar la incidencia</div>;
  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen text-white relative ">
      <main className="pb-4 pt-14 px-8 sm:px-6 lg:px-8">
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl px-8 py-3 shadow-xl">
          <Link href="/ver-incidencias" className="text-white hover:text-gray-300">
            <IoIosArrowDropleft className="text-4xl" />
          </Link>
          <h2 className="text-2xl font-bold mb-2">Actualizar Incidencia</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-2">Asunto</label>
              <input type="text" name="asunto" defaultValue={incidencia?.asunto} className="w-full bg-white bg-opacity-20 border border-gray-600 p-2 rounded-lg text-white" />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-2">Descripción</label>
              <textarea name="descripcion" defaultValue={incidencia?.descripcion} className="w-full bg-white bg-opacity-20 border border-gray-600 p-2 rounded-lg text-white"></textarea>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-2">Tipo</label>
              <input type="text" name="tipo" defaultValue={incidencia?.tipo} className="w-full bg-white bg-opacity-20 border border-gray-600 p-2 rounded-lg text-white" />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-2">Estado</label>
              <input type="text" name="estado" defaultValue={incidencia?.estado} className="w-full bg-white bg-opacity-20 border border-gray-600 p-2 rounded-lg text-white" />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-2">Ubicación</label>
              <input type="text" name="ubicacion" defaultValue={incidencia?.ubicacion} className="w-full bg-white bg-opacity-20 border border-gray-600 p-2 rounded-lg text-white" />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-2">Cargar Imagen</label>
              <input
                type="file"
                name="imagenes"
                multiple
                className="w-full bg-white bg-opacity-20 border border-gray-600 p-2 rounded-lg text-white"
              />
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white ml-28 px-4 py-2 rounded-lg font-medium transition duration-300">
              Actualizar Incidencia
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UpdateIncUser;
