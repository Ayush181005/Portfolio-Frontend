import React, { useEffect } from 'react'
import aboutmeImg from '../../images/aboutme-img.png'
import './AboutMe.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Helmet } from "react-helmet"

export const AboutMe = (props) => {
    // Get age
    const today = new Date();
    const DOB = new Date(2005, 10, 18);
    const yearDiff = today.getFullYear() - DOB.getFullYear();
    const monthDiff = (today.getMonth()+1) - DOB.getMonth();
    const age = yearDiff + (monthDiff < 0 ? -1 : 0);

    useEffect(() => { props.setLoadingBarProgress(100) }, []);

    const pageTitle = 'About Me - Ayush';
    const pageDesc = `I am a student right now, and am ${age} years old. I am learning programming concepts, art, and am passionate about science.`;

    return (
        <section className='about-section'>
            <Helmet>
                {/* Ganeral tags */}
                <title>{pageTitle}</title>
                <link rel="canonical" href={`${process.env.REACT_APP_DOMAIN_URL}/about`} />
                <meta name="description" content={pageDesc} />

                {/* OpenGraph tags */}
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDesc} />
                <meta property="og:type" content="website" />

                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:creator" content="@Ayush181005" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDesc} />
            </Helmet>

            <h1>About Me!</h1>
            <img src={aboutmeImg} alt="Me" className='aboutme-image' />
            <p>
                Hi, I am <b>Ayush</b> and I am currently studying in 12th standard. I am a student and have a great passion for programming. I have been learning various programming languages for several years now, including C, C++, C#, Java, JavaScript, and Python. My expertise lies in web development and I have been honing my skills in this field for quite some time now. I am well-versed in using frameworks like Django, Flask, and React to create visually stunning and user-friendly websites.
            </p>
            <p>
                My interest in programming and web development started at a young age, and I have been dedicated to expanding my knowledge and skills ever since. I have worked on various projects, such as creating websites for small businesses and designing interactive web applications for different purposes. I am constantly learning new technologies and tools to improve my development skills, and I believe that this continuous learning and development is essential to staying ahead in this field.
            </p>
            <p>
                Apart from programming, I also have an interest in art and enjoy playing lawn tennis. I am fascinated by Robotics and Space Science and Astronomy, I even enjoy watching different celestial objects using telescope. I believe that having diverse interests and hobbies helps to keep me well-rounded and motivated.
            </p>
            <p>
                I am a dedicated student and take my studies seriously. I am always looking for ways to improve and learn new skills. I believe that my technical abilities, well-rounded interests, and motivation make me a valuable asset to any team or project. Furthermore, my deep interest in robotics, space science and astronomy, and my inquisitive and curious nature further set me apart from others. I am excited to take on new challenges and opportunities in the future and I am confident that my skills and passion will allow me to excel in any field I choose to pursue.
            </p>

            <div className="icon-container">
                <a href="https://github.com/Ayush181005" target="_blank" rel="noopener noreferrer" aria-label="Github">
                    <FontAwesomeIcon icon="fa-brands fa-github" className='aboutme-icon' style={{color:'#211F1F'}} />
                </a>

                <a href="https://stackoverflow.com/users/15543100/ayush?tab=profile" target="_blank" rel="noopener noreferrer" aria-label="StackOverflow">
                    <FontAwesomeIcon icon="fa-brands fa-stack-overflow" className='aboutme-icon' style={{color:'#EF8236'}} />
                </a>

                <a href="https://www.freecodecamp.org/Ayush181005" target="_blank" rel="noopener noreferrer" aria-label="FreeCodeCamp">
                    <FontAwesomeIcon icon="fa-brands fa-free-code-camp" className='aboutme-icon' style={{color:'#0a0a22'}} />
                </a>
            </div>
        </section>
    )
}
