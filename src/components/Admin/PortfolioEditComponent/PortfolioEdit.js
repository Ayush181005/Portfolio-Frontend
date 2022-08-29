import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import PortfolioContext from '../../../context/portfolios/PortfolioContext';
import { Link } from 'react-router-dom';

export const PortfolioEdit = (props) => {
    const { showAlert } = props;
    const { id } = useParams();
    const { updatePortfolio, getPortfolioFromId } = useContext(PortfolioContext);

    const [portfolioData, setPortfolioData] = useState({title:'', desc:'', type:'', links:'', slug:''});

    useEffect(() => {
        (async () => {
            const response = await getPortfolioFromId(id);
            setPortfolioData(response);
        })();
    }, []);

    const [formData, setFormData] = useState(null);
    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setPortfolioData({ ...portfolioData, [e.target.name]: [e.target.value] });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jsonResponse = await updatePortfolio(id, formData);
        if (jsonResponse.success) {
            showAlert(`Updated Portfolio - ${portfolioData.title}`, 'success');
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
        <section className='portfolio-edit-section'>
            <h1>Edit a Portfolio</h1>
            <Link to="/admin">admin</Link>&gt;<Link to="/admin/portfolios">portfolios</Link>&gt;Edit portfolio
            <form onSubmit={handleSubmit}>
                <div className="inputBox">
                    <label htmlFor="form-title">Title</label>
                    <input type="text" name='title' id='form-title' placeholder='Title' onChange={handleOnChange} value={portfolioData.title} required />
                </div>
                <div className="inputBox">
                    <label htmlFor="form-type">Type</label>
                    <input type="text" name='type' id='form-type' placeholder='Type of the Portfolio' onChange={handleOnChange} value={portfolioData.type} />
                </div>
                <div className="inputBox">
                    <label htmlFor="form-slug">Slug</label>
                    <input type="text" name='slug' id='form-slug' placeholder='Slug of the Portfolio' onChange={handleOnChange} value={portfolioData.slug} />
                </div>
                <div className="inputBox">
                    <label htmlFor="form-links">Links</label>
                    <input type="text" name='links' id='form-links' placeholder='Links needed in Portfolio' onChange={handleOnChange} value={portfolioData.links} />
                    <small>Seperate by comma and space ', '</small>
                </div>
                <div className="inputBox">
                    <label htmlFor="form-desc">Description</label>
                    <textarea name="desc" id="form-desc" cols="30" rows="10" placeholder='Desc...' onChange={handleOnChange} value={portfolioData.desc}></textarea>
                </div>
                <button type="submit" className='btn submit-btn'>Save</button>
            </form>
        </section>
    )
}