import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import PortfolioContext from '../../context/portfolios/PortfolioContext'
import './PortfolioDetail.css'
import { Spinner } from '../SpinnerComponent/Spinner'
import { Helmet } from "react-helmet"

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
            { loading && <Spinner /> }
            { !loading && 
                <>
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>{portfolio.title}</title>
                        <link rel="canonical" href={`${process.env.REACT_APP_DOMAIN_URL}/portfolio/${portfolio.slug}`}/>
                        <meta name="description" content={portfolio.desc.slice(0, 100)}/>
                        <meta name="keywords" content={`${portfolio.title}, ${portfolio.slug}, ${portfolio.type}`}/>
                    </Helmet>
                    <div className="portfolio-title">
                        <h1>{portfolio.title}</h1>
                        <small className='badge'>{portfolio.type}</small>
                    </div>
                    <div className="portfolioImg">
                        {portfolio.img && <img src={`data:image/png;base64,${getBase64()}`} alt="" />}
                    </div>
                    <div className="portfolio-desc">
                        <p dangerouslySetInnerHTML={{__html: portfolio.desc}}></p>
                    </div>
                    <div className="portfolio-links">
                        {portfolio.links && portfolio.links.split(', ').map((link, index) => {
                            return <p key={index}><a href={link} target='_blank' rel="noreferrer noopener">{link}</a></p>
                        })}
                    </div>
                </>
            }
        </section>
    )
}
