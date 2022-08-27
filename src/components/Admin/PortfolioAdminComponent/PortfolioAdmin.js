import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PortfolioContext from '../../../context/portfolios/PortfolioContext';
import './PortfolioAdmin.css';

export const PortfolioAdmin = () => {
    const { portfolios, getPortfolios } = useContext(PortfolioContext);
    useEffect(() => {getPortfolios()}, []);
    
    return (
        <section className='portfolio-admin-section'>
            <div className="add-portfolio">
                <Link to="add"><button className="btn">Add</button></Link>
            </div>
            <table>
                <tr>
                    <th>Title</th>
                    <th>Actions</th>
                </tr>
                {portfolios.map((portfolio, i) => {
                    return (
                        <tr key={i}>
                            <td><Link to={`${portfolio._id}`}>{portfolio.title}</Link></td>
                            <td><button className="btn btn-sm">Edit</button> <button className="btn btn-sm">Delete</button></td>
                        </tr>
                    )
                })}
            </table>
        </section>
    )
}
