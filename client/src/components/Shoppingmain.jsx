import React from 'react'
import Navbar from './Navbar';
import Sidebar from './SideBar';
import { Outlet } from 'react-router-dom';
function Shoppingmain() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className={`GridClass ${isSidebarOpen ? 'open' : ''}`}>
          <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen}></Sidebar>
      <Navbar></Navbar>
    <Outlet/>
    </div>
  )
}

export default Shoppingmain