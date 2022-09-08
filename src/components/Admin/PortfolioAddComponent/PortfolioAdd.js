import React, { useContext, useState } from 'react';
import PortfolioContext from '../../../context/portfolios/PortfolioContext';
import { Link, useNavigate } from 'react-router-dom';

export const PortfolioAdd = (props) => {
    const { showAlert } = props;
    const { addPortfolio } = useContext(PortfolioContext);
    const navigate = useNavigate();

    // const [formData, setFormData] = useState(null);
    // const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        data.append('image', e.target.image.files[0]);

        const jsonResponse = await addPortfolio(data);
        if (jsonResponse.success) {
            showAlert(`Added Portfolio - ${data.title}`, 'success');
            navigate('/'); // Redirect to home page
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
        <section className='portfolio-add-section'>
            <h1>Add a Portfolio</h1>
            <Link to="/admin">admin</Link>&gt;<Link to="/admin/portfolios">portfolios</Link>&gt;add
            <form action="http://localhost:5000/api/portfolios/addportfolio" method="post" encType='multipart/form-data'>
                <div className="inputBox">
                    <label htmlFor="form-title">Title</label>
                    <input type="text" name='title' id='form-title' placeholder='Title' required />
                </div>
                <div className="inputBox">
                    <label htmlFor="form-type">Type</label>
                    <input type="text" name='type' id='form-type' placeholder='Type of the Portfolio'/>
                </div>
                <div className="inputBox">
                    <label htmlFor="form-slug">Slug</label>
                    <input type="text" name='slug' id='form-slug' placeholder='Slug of the Portfolio'/>
                </div>
                <div className="inputBox">
                    <label htmlFor="form-links">Links</label>
                    <input type="text" name='links' id='form-links' placeholder='Links needed in Portfolio'/>
                    <small>Seperate by comma and space ', '</small>
                </div>
                <div className="inputBox">
                    <label htmlFor="form-image">Image</label>
                    <input type="file" accept="image/*" name='image' id='form-image'/>
                </div>
                <input type="hidden" id="authToken" name="authToken" value={localStorage.getItem('auth-token')}></input>
                <div className="inputBox">
                    <label htmlFor="form-desc">Description</label>
                    <textarea name="desc" id="form-desc" cols="30" rows="10" placeholder='Desc...'></textarea>
                </div>
                <button type="submit" className='btn submit-btn'>Save</button>
            </form>
        </section>
    )
}
