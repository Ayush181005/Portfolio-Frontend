import React from 'react'
import logo from '../../images/logo.jpg'
import './Navbar.css'
import { Link } from 'react-router-dom'

export const Navbar = () => {

  const navListToggle = () => {
    document.getElementById('nav-list').classList.toggle('nav-list-hidden');
  }
  return (
    <header>
      <nav className='navbar'>
        <div className="nav-logo-parent">
          <Link to="/">
            <img src={logo} alt="Logo" className='navbar-logo'/>
          </Link>
        </div>
        <ul className='nav-list nav-list-hidden' id="nav-list">
            <li className='list-item left'><Link className='navbar-text' to="/">Home</Link></li>
            <li className='list-item right'><Link className='navbar-text' to="#">Portfolio</Link></li>
            <li className='list-item right'><Link className='navbar-text' to="/contact">Contact Me</Link></li>
            <li className='list-item right'><Link className='navbar-text' to="#">Certificates</Link></li>                
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