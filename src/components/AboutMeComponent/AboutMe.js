import React, { useEffect } from 'react'
import aboutmeImg from '../../images/aboutme-img.png'
import './AboutMe.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFreeCodeCamp, faGithub, faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { Helmet } from "react-helmet"

export const AboutMe = (props) => {
    // Get age
    const today = new Date();
    const DOB = new Date(2005, 10, 18);
    const yearDiff = today.getFullYear() - DOB.getFullYear();
    const monthDiff = today.getMonth() - DOB.getMonth();
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
                Hi! I'm <b>Ayush</b>, studying in grade 12 and I am {age} years old. I am from Ahmedabad, Gujarat in India. I study in <a target='_blank' href='https://anandniketanshilaj.org/' rel='noreferrer noopener' title='ANSH'>Anand Niketan School, Shilaj Campus</a>. Currently, I am preparing for my JEE and other entrance exams which are for the universities and colleges in India. I am currently working on my portfolio website (this website) made on MERN stack. I am interested in programming, learning about new technologies and I have learnt a few programming languages also, I am also interested in Lawn Tennis, badminton, table tennis, and other outdoor games. And I love Art, this website is not only for programming stuff but also for all other activities I do will be there in the portfolio section. I also have interest in robotics (arduinos) and I also use raspberry pi for my projects. Currently, I do all these only as a hobby. The most interesting subject for me is Science and in that too Physics is my favourite subject.
            </p>
            <p>
                My school teachers, especially in grade 11 and 12, Milan Sir, Hitesh Sir, Vinod Sir, John Sir and Jagdish Sir, and my Coaching classes teachers, Ravindra Sir, Vinod Sir, Prakash Sir and Saurabh Sir helped me to come back to track. Megha ma'am from <a target='_blank' href='https://sciknowtech.com/' rel='noreferrer noopener' title='SciKnowTech'>SciKnowTech</a> classes made me love science and where I went till grade 10 and learnt science practically, what we call experiential learning. SciKnowTech's philosophy is 'exposure leads to exploration and exploration to innovation' and those exposures to different places like GUSEC, SciKnowTalks(expert sessions), field trips did help me in understanding my core concepts better. Also, in programming, Dhiraj Sir from <a href="https://royaltechnosoft.com/" target="_blank" rel="noopener noreferrer" title='Royal Technosoft'>Royal Technosoft Pvt. Ltd.</a> help me develop interest in programming. Then, I learnt most of the programming and computer science from Google and Youtube.
            </p>
            <p>
                I have not decided what to do in future or what to pursue after 12th but I also like Astronomy and AstroPhysics which I think to pursue after getting a good reputed college in India (which is honestly very difficult to get).
            </p>

            <div className="icon-container">
                <a href="https://github.com/Ayush181005" target="_blank" rel="noopener noreferrer" aria-label="Github">
                    <FontAwesomeIcon icon={faGithub} className='aboutme-icon-github aboutme-icon' />
                </a>

                <a href="https://stackoverflow.com/users/15543100/ayush?tab=profile" target="_blank" rel="noopener noreferrer" aria-label="StackOverflow">
                    <FontAwesomeIcon icon={faStackOverflow} className='aboutme-icon-stackoverflow aboutme-icon' />
                </a>

                <a href="https://www.freecodecamp.org/Ayush181005" target="_blank" rel="noopener noreferrer" aria-label="FreeCodeCamp">
                    <FontAwesomeIcon icon={faFreeCodeCamp} className='aboutme-icon-freecodecamp aboutme-icon' />
                </a>
            </div>
        </section>
    )
}
