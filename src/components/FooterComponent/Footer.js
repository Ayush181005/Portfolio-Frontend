import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faGithub, faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { useLocation } from 'react-router-dom'

export const Footer = () => {

    // Rurturn nothing if on login page to not show the navbar
    let location = useLocation();
    if (location.pathname === '/signin' || location.pathname.startsWith('/admin')) return;

    return (
        <footer>
            <div className="footer-body">
                <div className="row">
                    <div className="row-left">
                        Copyright &copy; 2022 |
                    </div>
                    <div className="row-right">
                        <a href='https://github.com/Ayush181005' className='footer-icon' target='_blank' rel="noreferrer noopener" title='Github'>
                            <FontAwesomeIcon icon={faGithub} className='footer-icon-github' />
                            &nbsp;
                            <span className="text">Github</span>
                        </a>

                        <a href='https://stackoverflow.com/users/15543100/ayush?tab=profile' className='footer-icon' target='_blank' rel="noreferrer noopener" title='StackOverflow'>
                            <FontAwesomeIcon icon={faStackOverflow} className='footer-icon-stackoverflow' />
                            &nbsp;
                            <span className="text">StackOverflow</span>
                        </a>

                        <a href='https://www.youtube.com/channel/UCwTq8nmeVXyBn9sZcK3uNhg?sub_confirmation=1' className='footer-icon' target='_blank' rel="noreferrer noopener" title='Youtube'>
                            <FontAwesomeIcon icon={faYoutube} className='footer-icon-youtube' />
                            &nbsp;
                            <span className="text">Youtube</span>
                        </a>
                    </div>
                </div>
                <div className="developer"><small>Designed and Developed by <Link to="/">Ayush</Link></small></div>
            </div>
        </footer>
    )
}
