import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import PortfolioContext from '../../context/portfolios/PortfolioContext'
import './PortfolioDetail.css'
import { Spinner } from '../SpinnerComponent/Spinner'
import { Helmet } from "react-helmet"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const PortfolioDetail = (props) => {
    const { slug } = useParams();
    const { portfolio, getPortfolioFromSlug } = useContext(PortfolioContext);
    const { setLoadingBarProgress } = props;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoadingBarProgress(50);
        getPortfolioFromSlug(slug)
        .then(()=>{
            setLoadingBarProgress(100);
            setLoading(false);
        });
    }, []); // calls only once

    const getBase64 = () => {return btoa(new Uint8Array(portfolio.img.data.data).reduce(function (data, byte) {return data + String.fromCharCode(byte);}, ''));}

    return (
        <section className='portfolioDetailSection'>
            {loading && <span className="portfolio-detail-spinner">
                <Spinner />
            </span>}
            { !loading && 
                <>
                    <Helmet>
                        {/* Ganeral tags */}
                        <title>{portfolio.title} - Ayush</title>
                        <link rel="canonical" href={`${process.env.REACT_APP_DOMAIN_URL}/portfolio/${portfolio.slug}`} />
                        <meta name="description" content={portfolio.desc.slice(0, 100)} />
                        <meta name="keywords" content={`${portfolio.title}, ${portfolio.slug}, ${portfolio.type}`}/>

                        {/* OpenGraph tags */}
                        <meta property="og:title" content={portfolio.title} />
                        <meta property="og:description" content={portfolio.desc.slice(0, 100)} />
                        <meta property="og:type" content="website" />

                        {/* Twitter Card tags */}
                        <meta name="twitter:card" content="summary" />
                        <meta name="twitter:creator" content="@Ayush181005" />
                        <meta name="twitter:title" content={portfolio.title} />
                        <meta name="twitter:description" content={portfolio.desc.slice(0, 100)} />
                    </Helmet>
                    <div className="portfolio-title">
                        <h1>{portfolio.title}</h1>
                        <small className='badge'>{portfolio.type}</small>
                    </div>
                    <div className="portfolioImg">
                        {portfolio.img && <img src={`data:image/png;base64,${getBase64()}`} alt="" />}
                    </div>
                    <div className="portfolio-desc">
                        <div dangerouslySetInnerHTML={{__html: portfolio.desc}}></div>
                    </div>
                    <div className="portfolio-links">
                        {portfolio.githubLink &&
                        <a href={portfolio.githubLink} target='_blank' rel="noreferrer noopener" >
                            <FontAwesomeIcon icon="fa-brands fa-github" className="portfolio-detail-icon"  style={{color:'#211F1F'}} />
                        </a>}
                        {portfolio.websiteLink &&
                        <a href={portfolio.websiteLink} target='_blank' rel="noreferrer noopener" >
                            <FontAwesomeIcon icon="fa-solid fa-link" className="portfolio-detail-icon" style={{color:'#333'}} />
                        </a>}
                    </div>
                </>
            }
        </section>
    )
}
