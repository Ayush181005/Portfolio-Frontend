import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import CertificateContext from '../../../context/certificates/CertificateContext';
import './CertificateAdmin.css';

export const CertificateAdmin = (props) => {
    const { showAlert } = props;
    const { certificates, getCertificates, deleteCertificate } = useContext(CertificateContext);
    useEffect(() => {getCertificates()}, []);

    const handleDelete = async (id) => {
        const jsonResponse = await deleteCertificate(id);
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
        <section className='certificate-admin-section'>
            <h1>Certificates</h1>
            <Link to="/admin">admin</Link>&gt;certificates
            <div className="add-certificate">
                <Link to="add"><button className="btn">Add</button></Link>
            </div>
            {certificates.length>0 ? 
                <table>
                    <tr>
                        <th>Competition Name</th>
                        <th>Year</th>
                        <th>Field</th>
                        <th>Actions</th>
                    </tr>
                    {certificates.map((certificate, i) => {
                        return (
                            <tr key={i}>
                                <td>{certificate.compName}</td>
                                <td>{certificate.year}</td>
                                <td>{certificate.field}</td>
                                <td><button className="btn btn-sm" onClick={()=>{handleDelete(certificate._id)}}>Delete</button></td>
                            </tr>
                        )
                    })}
                </table>
            : <small>No Certificates to display</small>}
        </section>
    )
}
