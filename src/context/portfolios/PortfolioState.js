import { useState } from "react";
import PortfolioContext from "./PortfolioContext";

const apiCall = async (url, method, requestBody) => {
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify(requestBody)
    });
    const jsonResponse = await response.json();
    return jsonResponse;
}

const PortfolioState = (props) => {
    const baseURL = process.env.REACT_APP_SERVER_BASE_URL;
    const [portfolios, setPortfolios] = useState([]); // Array of portfolio objects
    const [portfolio, setPortfolio] = useState({}); // single portfolio object

    // Get All Portfolios
    const getPortfolios = async () => {
        const url = `${baseURL}/api/portfolios/getportfolios`;
        const jsonResponse = await apiCall(url, 'POST');
        setPortfolios(jsonResponse);
    }

    // Get Portfolio from id
    const getPortfolioFromId = async (id) => {
        const url = `${baseURL}/api/portfolios/getportfoliofromid/${id}`;
        const jsonResponse = await apiCall(url, 'GET');
        setPortfolio(jsonResponse);
        return(jsonResponse);
    }

    // Get Portfolio from slug
    const getPortfolioFromSlug = async (slug) => {
        const url = `${baseURL}/api/portfolios/getportfolio/${slug}`;
        const jsonResponse = await apiCall(url, 'GET');
        setPortfolio(jsonResponse);
        return jsonResponse;
    }

    // Add Portfolio
    const addPortfolio = async (portfolioBody) => {
        // portfolio body is JSON object with title, desc, type, githubLink, websiteLink and slug
        const url = `${baseURL}/api/portfolios/addportfolio`;
        const jsonResponse = await apiCall(url, 'POST', portfolioBody);

        if (!jsonResponse.success) return { error: jsonResponse.errors, success: false };

        setPortfolios(portfolios.concat(jsonResponse.portfolio));
        return { success: true };
    }

    // Update Portfolio
    const updatePortfolio = async (id, portfolioBody) => {
        // portfolio body is JSON object with title, desc, type, githubLink, websiteLink or slug
        const url = `${baseURL}/api/portfolios/updateportfolio/${id}`;
        const jsonResponse = await apiCall(url, 'PUT', portfolioBody);

        if (!jsonResponse.success) return { error: jsonResponse.errors, success: false };

        const newPortfolios = portfolios.map(portfolio => {
            if (portfolio._id === id) {
                return jsonResponse;
            }
            return portfolio;
        }
        );
        setPortfolios(newPortfolios);
        return { success: true };
    }

    // Delete Portfolio
    const deletePortfolio = async (id) => {
        const url = `${baseURL}/api/portfolios/deleteportfolio/${id}`;
        const jsonResponse = await apiCall(url, 'DELETE');

        if (!jsonResponse.success) return { error: jsonResponse.errors, success: false };

        setPortfolios(portfolios.filter((portfolio) => portfolio._id !== id));
        return { success: true };
    }

    return (
        <PortfolioContext.Provider value={{
            portfolios,
            portfolio,
            getPortfolios,
            getPortfolioFromId,
            getPortfolioFromSlug,
            addPortfolio,
            deletePortfolio,
            updatePortfolio
        }}>
            {props.children}
        </PortfolioContext.Provider>
    );
}

export default PortfolioState;