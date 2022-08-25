import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import PortfolioContext from '../../context/portfolios/PortfolioContext'

export const PortfolioDetail = () => {
    const { slug } = useParams();
    const { portfolio, getPortfolioFromSlug } = useContext(PortfolioContext);
  
    useEffect(() => {getPortfolioFromSlug(slug)}, []); // calls only once

    return (
        <section className='portfolioDetailSection'>
            {portfolio.title}
        </section>
    )
}
