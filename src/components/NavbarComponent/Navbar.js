import React from 'react'
import logo from '../../images/logo.jpg'
import './Navbar.css'
import { Link, useLocation } from 'react-router-dom'

export const Navbar = () => {
  let location = useLocation();

  const navListToggle = () => {
    document.getElementById('nav-list').classList.toggle('nav-list-hidden');
  }

  // Rurturn nothing if on login page to not show the navbar
  if (location.pathname==='/signin') return;

  return (
    <header>
      <nav className='navbar'>
        <div className="nav-logo-parent">
          <Link to="/">
            <img src={logo} alt="Logo" className='navbar-logo'/>
          </Link>
        </div>
        <ul className='nav-list nav-list-hidden' id="nav-list">
            <li className='list-item'><Link className={`navbar-text left ${location.pathname==='/'?'active':''}`} to="/">Home</Link></li>
            <li className='list-item'><Link className={`navbar-text right ${location.pathname==='/about'?'active':''}`} to="/about">About Me</Link></li>
            <li className='list-item'><Link className={`navbar-text right ${location.pathname==='/contact'?'active':''}`} to="/contact">Contact Me</Link></li>
            <li className='list-item'><Link className={`navbar-text right ${location.pathname==='/certificate'?'active':''}`} to="/certificate">Certificates</Link></li>
        </ul>
        <div className="menu" id="toggle-button" onClick={navListToggle}>
          <div className="menu-line" id="menu-line-1"></div>
          <div className="menu-line" id="menu-line-2"></div>
          <div className="menu-line" id="menu-line-3"></div>
        </div>
      </nav>
    </header>
  )
}