import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const CertificateAdd = (props) => {
    const host = process.env.REACT_APP_SERVER_HOST;
    const port = process.env.REACT_APP_SERVER_PORT;
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

        const response = await fetch(`http://${host}:${port}/api/certificates/addcertificate`, {
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            },
            method: 'POST',
            body: formData
        });
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
            showAlert(`Added Certificate - ${data.compName}`, 'success');
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
        <section className='certificate-add-section'>
            <h1>Add a Certificate</h1>
            <Link to="/admin">admin</Link>&gt;<Link to="/admin/certificates">certificates</Link>&gt;add
            <form onSubmit={handleSubmit}>
                <div className="inputBox">
                    <label htmlFor="form-compName">Competition Name</label>
                    <input onChange={handleOnChange} type="text" name='compName' id='form-compName' placeholder='Name of the Competition' required />
                </div>
                <div className="inputBox">
                    <label htmlFor="form-year">Year</label>
                    <input onChange={handleOnChange} type="number" name='year' id='form-year' placeholder='Year of Certification' min="2005" max={new Date().getFullYear()} required />
                </div>
                <div className="inputBox">
                    <label htmlFor="form-field">Field</label>
                    <input onChange={handleOnChange} type="text" name='field' id='form-field' placeholder='Field in which the competition was held' required />
                </div>
                <div className="inputBox">
                    <label htmlFor="form-image">Image</label>
                    <input onChange={handleOnChange} type="file" accept="image/*" name='image' id='form-image' required/>
                </div>
                <button type="submit" className='btn submit-btn'>Save</button>
            </form>
        </section>
    )
}
