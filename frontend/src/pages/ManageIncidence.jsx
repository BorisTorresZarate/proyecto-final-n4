import React, { useState, useEffect } from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import SearchBar from '../components/dashboard/SearchBar';
import TaskTable from '../components/dashboard/TaskTable';
import { IoIosArrowDropleft } from "react-icons/io";
import { Link } from 'wouter';
import { fetchIncidencias, updateIncidenciaEstado } from '../api/fetchIncidencias';

function ManageIncidence({ userNombre, isAdmin }) {
  const [incidencias, setIncidencias] = useState([]);
  const [filteredIncidencias, setFilteredIncidencias] = useState([]);
  const [filters, setFilters] = useState({
    estado: [],
    desde: '',
    hasta: '',
    asignado: ''
  });

  useEffect(() => {
    loadIncidencias();
  }, []);

  useEffect(() => {
    applyFilters(filters);
  }, [filters, incidencias]);

  const loadIncidencias = async () => {
    try {
      const data = await fetchIncidencias();
      setIncidencias(data);
      setFilteredIncidencias(data);
    } catch (error) {
      console.error('Error fetching incidencias:', error.message);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const applyFilters = (currentFilters) => {
    let filtered = incidencias;

    if (currentFilters.estado.length > 0) {
      filtered = filtered.filter(inc =>
        currentFilters.estado.includes(inc.estado.toLowerCase())
      );
    }

    if (currentFilters.desde) {
      filtered = filtered.filter(inc =>
        new Date(inc.createdAt) >= new Date(currentFilters.desde)
      );
    }

    if (currentFilters.hasta) {
      filtered = filtered.filter(inc =>
        new Date(inc.createdAt) <= new Date(currentFilters.hasta)
      );
    }

    if (currentFilters.asignado) {
      filtered = filtered.filter(inc =>
        inc.userId && inc.userId.toString().includes(currentFilters.asignado)
      );
    }

    setFilteredIncidencias(filtered);
  };

  const handleUpdateState = async (incidenciaId, newState) => {
    try {
      await updateIncidenciaEstado(incidenciaId, newState);
      loadIncidencias(); // Recargar incidencias después de actualizar
    } catch (error) {
      console.error('Error updating incidencia state:', error.message);
    }
  };

  return (
    <div className="min-h-screen  text-white relative overflow-hidden">
      <div className="absolute bg-white opacity-10 inset-0 z-0">
      </div>
      <div className="relative z-10">
        <DashboardHeader userNombre={userNombre} />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="text-white hover:text-gray-300 transition duration-300">
            <IoIosArrowDropleft className="text-5xl"/>
          </Link>
          <SearchBar onFilterChange={handleFilterChange} />
          <TaskTable
            tasks={filteredIncidencias}
            isAdmin={isAdmin}
            onUpdateState={handleUpdateState}
          />
        </main>
      </div>
    </div>
  );
}

export default ManageIncidence;
