import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PortfolioContext from '../../../context/portfolios/PortfolioContext';
import './PortfolioAdmin.css';

export const PortfolioAdmin = (props) => {
    const { showAlert } = props;
    const { portfolios, getPortfolios, deletePortfolio } = useContext(PortfolioContext);
    useEffect(() => {getPortfolios()}, []);

    const handleDelete = async (id) => {
        const jsonResponse = await deletePortfolio(id);
        if (jsonResponse.success) {
            showAlert('Deleted Portfolio', 'success');
        }
        else {
            let errorMsg = ""
            jsonResponse.errors.map(error => {
                errorMsg += error.msg + "\n";
            });
            showAlert(errorMsg, 'error');
        }
    }

    return (
        <section className='portfolio-admin-section'>
            <h1>Portfolios</h1>
            <Link to="/admin">admin</Link>&gt;portfolios
            <div className="add-portfolio">
                <Link to="add"><button className="btn">Add</button></Link>
            </div>
            {portfolios.length>0 ? 
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                    {portfolios.map((portfolio, i) => {
                        return (
                            <tr key={i}>
                                <td><Link to={`edit/${portfolio._id}`}>{portfolio.title}</Link></td>
                                <td><button className="btn btn-sm" onClick={()=>{handleDelete(portfolio._id)}}>Delete</button></td>
                            </tr>
                        )
                    })}
                </table>
            : <small>No Portfolios to display</small>}
        </section>
    )
}
