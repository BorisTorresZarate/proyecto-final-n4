import React, { useContext, useState } from 'react';
import WelcomeMessage from '../components/dashboard/WelcomeMessage';
import UserInfo from '../components/dashboard/UserInfo';
import { UserContext } from '../services/UserContext';
import HeaderNavbar from '../components/dashboard/HeaderNavbar';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

function Dashboard() {
  const { user, loading } = useContext(UserContext);
  const [menuDisplayed, setMenuDisplayed] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault();
    setMenuDisplayed(!menuDisplayed);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <div>No hay información de usuario disponible.</div>;
  }

  return (
    <div id="wrapper" className={menuDisplayed ? "menuDisplayed" : ""}>
      {/* Sidebar */}
      <div
        id="sidebar-wrapper"
        className={`fixed top-0 left-0 h-full bg-white bg-opacity-20 transition-all duration-500 flex flex-col ${menuDisplayed ? 'w-80' : 'w-0'
          } overflow-hidden z-50`}
      >
        <HeaderNavbar userType={user.tipo} />
      </div>
      <div className="z-10 absolute top-[50%] left-0">
        <button
          className={`text-sm p-0 m-0  bg-transparent  text-white transition-all duration-300 hover:text-black focus:outline-none transform ${menuDisplayed ? 'translate-x-80' : 'translate-x-0'}`}
          id="menu-toggle"
          onClick={toggleMenu}
        >
          <span >
            {menuDisplayed ?<FaArrowAltCircleLeft className='w-10 h-10' /> : <FaArrowAltCircleRight className='w-10 h-10' /> }
          </span>
        </button>
      </div>
      <div id="page-content-wrapper" className={`relative w-full transition-all duration-500 ${menuDisplayed ? 'pl-64' : 'pl-0'}`}>
        <div className='container mx-auto px-4 py-8'>
          <div className=" text-white  bg-red-400 bg-opacity-10 border-2 border-solid border-white border-opacity-20 rounded-xl">
            <div className="relative z-10">
              <main className="max-w-7xl mx-auto py-8 px-4 sm:px-8 lg:px-8">
                <WelcomeMessage userNombre={user.nombre} userType={user.tipo} />
                <div className=" w-auto h-auto  mt-4">
                  <UserInfo userNombre={user.nombre} userType={user.tipo} userHabitacion={user.apartamento} userPiso={user.piso} />
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;