import { useState } from "react";
import CertificateContext from "./CertificateContext";

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

const CertificateState = (props) => {
    const baseURL = process.env.REACT_APP_SERVER_BASE_URL;
    const [certificates, setCertificates] = useState([]); // Array of certificate objects
    // const [certificate, setCertificate] = useState({}); // single certificate object

    // Get All Certificates
    const getCertificates = async () => {
        const url = `${baseURL}/api/certificates/getcertificates`;
        const jsonResponse = await apiCall(url, 'POST');
        setCertificates(jsonResponse);
    }

    // Add Certificate
    const addCertificate = async (certificateBody) => {
        const url = `${baseURL}/api/certificates/addcertificate`;
        const jsonResponse = await apiCall(url, 'POST', certificateBody);

        if (!jsonResponse.success) return { error: jsonResponse.errors, success: false };

        setCertificates(certificates.concat(jsonResponse.certificate));
        return { success: true };
    }

    // Delete Certificate
    const deleteCertificate = async (id) => {
        const url = `${baseURL}/api/certificates/deletecertificate/${id}`;
        const jsonResponse = await apiCall(url, 'DELETE');

        if (!jsonResponse.success) return { error: jsonResponse.errors, success: false };

        setCertificates(certificates.filter((certificate) => certificate._id !== id));
        return { success: true };
    }

    return (
        <CertificateContext.Provider value={{
            certificates,
            getCertificates,
            addCertificate,
            deleteCertificate,
        }}>
            {props.children}
        </CertificateContext.Provider>
    );
}

export default CertificateState;