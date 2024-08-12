import React from 'react';
import { Link, useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { subirImagen } from '../api/fetchImagenes';
import { IoIosArrowDropleft } from 'react-icons/io';

function CreateIncidence({ userNombre }) {
  const [, navigate] = useLocation();
  const imagenMutation = useMutation({
    mutationKey: ['imagen'],
    mutationFn: subirImagen,
    onSuccess: data => {alert(data.message); navigate('/dashboard');},
    onError: error => console.log('Error al subir la imagen', error)
  });

  const handlesubmit = async e => {
    e.preventDefault();
    const formData = new FormData();

    // Agregar múltiples archivos
    const fileInput = e.target.imagenes;
    for (let i = 0; i < fileInput.files.length; i++) {
      formData.append('imagenes', fileInput.files[i]);
    }

    // Agregar otros campos del formulario al FormData
    formData.append('asunto', e.target.asunto.value);
    formData.append('descripcion', e.target.descripcion.value);
    formData.append('tipo', e.target.tipo.value);
    formData.append('estado', e.target.estado.value);
    formData.append('ubicacion', e.target.ubicacion.value);

    try {
      await imagenMutation.mutateAsync(formData);
    } catch (error) {
      console.error('Error al crear la incidencia:', error);
    }
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden mt-10">
        <main className="max-w-7xl mx-auto py-6 px-8 sm:px-6 lg:px-8">
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl px-8 py-1">
            <Link href="/dashboard" className="text-white hover:text-gray-300">
              <IoIosArrowDropleft className="text-4xl" />
            </Link>
            <h2 className="text-2xl font-bold mb-2">Crear Nueva Incidencia</h2>
            <form onSubmit={handlesubmit}>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-2">Asunto</label>
                <input type="text" name="asunto" className="w-full bg-white bg-opacity-20 border border-gray-600 p-2 rounded-lg text-white" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-2">Descripción</label>
                <textarea name="descripcion" className="w-full bg-white bg-opacity-20 border border-gray-600 p-2 rounded-lg text-white"></textarea>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-2">Tipo</label>
                <input type="text" name="tipo" className="w-full bg-white bg-opacity-20 border border-gray-600 p-2 rounded-lg text-white" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-2">Estado</label>
                <input type="text" name="estado" className="w-full bg-white bg-opacity-20 border border-gray-600 p-2 rounded-lg text-white" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-2">Ubicacion</label>
                <input type="text" name="ubicacion" className="w-full bg-white bg-opacity-20 border border-gray-600 p-2 rounded-lg text-white" />
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
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white ml-24 mb-2 px-10 py-2 rounded-lg font-medium transition duration-300">
                Crear Incidencia
              </button>
            </form>
          </div>
        </main>
    </div>
  );
}

export default CreateIncidence;
