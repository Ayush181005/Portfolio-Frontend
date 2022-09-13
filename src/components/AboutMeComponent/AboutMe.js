import React, { useEffect } from 'react'
import aboutmeImg from '../../images/aboutme-img.png'
import './AboutMe.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFreeCodeCamp, faGithub, faStackOverflow } from '@fortawesome/free-brands-svg-icons'

export const AboutMe = (props) => {
    // Get age
    const today = new Date();
    const DOB = new Date(2005, 10, 18);
    const yearDiff = today.getFullYear() - DOB.getFullYear();
    const monthDiff = today.getMonth() - DOB.getMonth();
    const age = yearDiff + (monthDiff<0 ? -1 : 0);

    useEffect(() => {props.setLoadingBarProgress(100)}, []);

    return (
        <section className='about-section'>
            <h1>About Me!</h1>
            <p>
                <img src={aboutmeImg} alt="Me" className='aboutme-image' />
                Hi! I'm <b>Ayush</b>, studying in grade 12 and I am {age} years old. I am from Ahmedabad, Gujarat in India. I study in Anand Niketan School, Shilaj Campus. Currently, I am preapering for my JEE and other entrance exams which are for the universities and colleges in India. I am currently working on my portfolio website (this website) made on MERN stack. I am interested in programming, learning about new technologies and I have learnt a few programming languages also, I am also interested in Lawn Tennis, badminton, table tennis, and other outdoor games. And I love Art, this website is not only for programming stuff but also for all other activities I do. I also go to coaching classes for my preparation of JEE. I had left my coaching classes in 11th class because of too much load and I wanted to focus not only in studies but also the extracurricular activities, but then I joined it again to study hard. I also have interest in robotics (arduinos) and I also use raspberry pi for my projects. Currently, I do all these only as a hobby. I am most interested in Science and mainly physics is my favourite subject, not only as in the syllabus but also practically.
            </p>
            <p>
                I had no interest in Science and technology years back when I was in 6th when I joined the <a target='_blank' href='https://sciknowtech.com/' rel='noreferrer noopener' title='SciKnowTech'>SciKnowTech</a> classes which made me love science and where I learnt science practically, what we call is experiential learning. Also, in programming, I had no interest till Dhiraj Sir from <a href="https://royaltechnosoft.com/" target="_blank" rel="noopener noreferrer" title='Royal Technosoft'>Royal Technosoft Pvt. Ltd.</a> came to our school one fine day for a lecture about what is exactly programming and why should everyone learn atleast one programming language. Then I joined the short term and long term programmes of it and after completing most of the things there when learning python was still left and quarantine was going on, my friend's uncle gave me a link to freecodecamp's python tutorial and then I started learning advance concepts of programming from YouTube and other sources like that. Till now I am learning mostly everything from google and python.
            </p>
            <p>
                I do things related to Computer Science just as a hobby and not decided to pursue it as my career. I also like Astronomy and AstroPhysics which I think to pursue after getting a good reputed college in India (which is honestly very difficult to get).
            </p>

            <div className="icon-container">
                <a href="https://github.com/Ayush181005" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} className='aboutme-icon-github aboutme-icon' />
                </a>

                <a href="https://stackoverflow.com/users/15543100/ayush?tab=profile" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faStackOverflow} className='aboutme-icon-stackoverflow aboutme-icon' />
                </a>

                <a href="https://www.freecodecamp.org/Ayush181005" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFreeCodeCamp} className='aboutme-icon-freecodecamp aboutme-icon' />
                </a>
            </div>
        </section>
    )
}
