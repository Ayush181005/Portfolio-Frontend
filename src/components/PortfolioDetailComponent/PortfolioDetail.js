import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import PortfolioContext from '../../context/portfolios/PortfolioContext'

export const PortfolioDetail = (props) => {
    const { slug } = useParams();
    const { portfolio, getPortfolioFromSlug } = useContext(PortfolioContext);
    const { setLoadingBarProgress } = props;

    useEffect(() => {
        setLoadingBarProgress(50);
        getPortfolioFromSlug(slug)
        .then(()=>{setLoadingBarProgress(100);});
    }, []); // calls only once

    return (
        <section className='portfolioDetailSection'>
            <div className="portfolio-title">
                <h1>{portfolio.title}</h1>
            </div>
            <div className="portfolio-type">
                <small>{portfolio.type}</small>
            </div>
            <div className="portfolio-desc">
                <p>{portfolio.desc}</p>
            </div>
        </section>
    )
}
