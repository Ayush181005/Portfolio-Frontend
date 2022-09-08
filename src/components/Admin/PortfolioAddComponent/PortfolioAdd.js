import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const PortfolioAdd = (props) => {
    const { showAlert } = props;
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const handleOnChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(); // encType='multipart/form-data'

        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }
        formData.append('image', e.target.image.files[0])

        const response = await fetch('http://localhost:5000/api/portfolios/addportfolio', {
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            },
            method: 'POST',
            body: formData
        });
        const jsonResponse = await response.json();
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
            <form onSubmit={handleSubmit}>
                <div className="inputBox">
                    <label htmlFor="form-title">Title</label>
                    <input onChange={handleOnChange} type="text" name='title' id='form-title' placeholder='Title' required />
                </div>
                <div className="inputBox">
                    <label htmlFor="form-type">Type</label>
                    <input onChange={handleOnChange} type="text" name='type' id='form-type' placeholder='Type of the Portfolio' />
                </div>
                <div className="inputBox">
                    <label htmlFor="form-slug">Slug</label>
                    <input onChange={handleOnChange} type="text" name='slug' id='form-slug' placeholder='Slug of the Portfolio' />
                </div>
                <div className="inputBox">
                    <label htmlFor="form-links">Links</label>
                    <input onChange={handleOnChange} type="text" name='links' id='form-links' placeholder='Links needed in Portfolio' />
                    <small>Seperate by comma and space ', '</small>
                </div>
                <div className="inputBox">
                    <label htmlFor="form-image">Image</label>
                    <input onChange={handleOnChange} type="file" accept="image/*" name='image' id='form-image' />
                </div>
                <div className="inputBox">
                    <label htmlFor="form-desc">Description</label>
                    <textarea onChange={handleOnChange} name="desc" id="form-desc" cols="30" rows="10" placeholder='Desc...'></textarea>
                </div>
                <button type="submit" className='btn submit-btn'>Save</button>
            </form>
        </section>
    )
}
