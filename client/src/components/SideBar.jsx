import React from 'react';
import "../Styling/sidebar.css"
const Sidebar = ({setSidebarOpen,isSidebarOpen}) => {
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const sidebarcolor=()=>{
    if(!isSidebarOpen)
    return{ cursor: 'pointer',color: 'whitesmoke'}
    return { cursor: 'pointer',color: 'rgb(19,25,33)'}
  }
  return (
    <div
      className={`sidebar ${isSidebarOpen ? 'open':''}`}
      style={{
        paddingTop: '20px',
        paddingLeft: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease-in-out',
        
      }}
    >
      <div
        className="hamburger"
        onClick={toggleSidebar}
        style={sidebarcolor()}
      >
        &#9776;
      </div>
      <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
        <li style={{ textDecoration: 'none' }}>
          <h6>
          {(localStorage.getItem('UserName')===null)?'Guest':localStorage.getItem('UserName')}
          </h6>
        </li>
        <li>
          <a href="#home" style={{ textDecoration: 'none' }}>
            Home
          </a>
        </li>
        <li>
          <a href="#cart" style={{ textDecoration: 'none' }}>
            Your Cart
          </a>
        </li>
        <li>
          <a href="#orders" style={{ textDecoration: 'none' }}>
            Orders
          </a>
        </li>
        <li>
          <a href="#settings" style={{ textDecoration: 'none' }}>
            Settings
          </a>
        </li>
        <li>
          <a href="#profile" style={{ textDecoration: 'none' }}>
            Profile
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
