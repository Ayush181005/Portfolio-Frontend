import React from 'react'
import logo from '../../images/logo.jpg'
import './Navbar.css'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Navbar = (props) => {
  const { getUserData, userData } = props;
  let location = useLocation();

  useEffect(() => {
    const myFunc = async () => {
      const myData = await getUserData();
    }
    myFunc();
  }, []);

  const navListToggle = () => {
    document.getElementById('nav-list').classList.toggle('nav-list-hidden');
  }

  // Rurturn nothing if on login page to not show the navbar
  if (location.pathname==='/signin' || location.pathname.startsWith('/admin')) return;

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.reload();
  }

  // Handle dropdown toggle
  const dropdownClick = () => document.getElementsByClassName('dropdown')[0].classList.toggle('hidden');

  const closeNav = () => {
    document.getElementById('nav-list').classList.add('nav-list-hidden');
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
            <li className='list-item'><Link className={`navbar-text left ${location.pathname==='/'?'active':''}`} to="/" onClick={closeNav}>Home</Link></li>
            <li className='list-item'><Link className={`navbar-text right ${location.pathname==='/about'?'active':''}`} to="/about" onClick={closeNav}>About Me</Link></li>
            <li className='list-item'><Link className={`navbar-text right ${location.pathname==='/portfolio'?'active':''}`} to="/portfolio" onClick={closeNav}>Portfolio</Link></li>
            <li className='list-item'><Link className={`navbar-text right ${location.pathname==='/certificates'?'active':''}`} to="/certificates" onClick={closeNav}>Certificates</Link></li>
            {/* <li className='list-item'><Link className={`navbar-text right ${location.pathname==='/contact'?'active':''}`} to="/contact">Contact Me</Link></li> */}
            <li className='list-item'><Link className={`navbar-text right ${location.pathname==='/contact'?'active':''}`} to="/contact" onClick={closeNav}>Contact Me</Link></li>
            {userData.success && <li className='list-item'>
              <button className="btn navbar-btn" onClick={dropdownClick}>Hi {userData.user.name}&nbsp;<i className="arrow down"></i></button>
              <div className="dropdown hidden">
                <div className="dropdown-menu">
                  <div className="dropdown-item" onClick={handleLogout}>Logout</div>
                  {userData.user.type==='superuser' && <a href="/admin" target="_blank"><div className="dropdown-item">Admin</div></a>}
                </div>
              </div>
            </li>}
        </ul>
        <div className="menu" id="toggle-button" onClick={navListToggle}>
          <div className="menu-line" id="menu-line-1"></div>
          <div className="menu-line" id="menu-line-2"></div>
          <div className="menu-line" id="menu-line-3"></div>
        </div>
      </nav>

      <a href="https://blog.theayush.in" target="_blank" aria-label="TheAyush Blog">
        <div className="blog-link-container">
          <FontAwesomeIcon icon="fa-solid fa-blog" style={{color:"black"}}/>&nbsp;Blog
        </div>
      </a>
    </header>
  )
}