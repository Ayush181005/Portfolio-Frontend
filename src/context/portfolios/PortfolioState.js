import { useState } from "react";
import PortfolioContext from "./PortfolioContext";

const PortfolioState = (props) => {
    const host = 'localhost';
    const port = '5000';
    const [portfolios, setPortfolios] = useState([]); // Array of portfolio objects
    const [portfolio, setPortfolio] = useState({}); // single portfolio object

    // Get All Portfolios
    const getPortfolios = async () => {
        // API Call
        const response = await fetch(`http://${host}:${port}/api/portfolios/getportfolios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const jsonResponse = await response.json();
        setPortfolios(jsonResponse);
    }

    // Get Portfolio from slug
    const getPortfolioFromSlug = async (slug) => {
        // API Call
        const response = await fetch(`http://${host}:${port}/api/portfolios/getportfolio/${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const jsonResponse = await response.json();
        setPortfolio(jsonResponse);
    }

    return (
        <PortfolioContext.Provider value={{ portfolios, portfolio, getPortfolios, getPortfolioFromSlug }}>
            {props.children}
        </PortfolioContext.Provider>
    );
}

export default PortfolioState;