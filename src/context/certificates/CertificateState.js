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
    const [certPage, setCertPage] = useState(1); // Current page of certificates
    const [numTotalCertificates, setNumTotalCertificates] = useState(0); // Total number of certificates
    const [allFields, setAllFields] = useState([]); // All the fields of certificates

    // Get All Certificates
    const getCertificates = async () => {
        const url = `${baseURL}/api/certificates/getcertificates`;
        const jsonResponse = await apiCall(url, 'POST');
        setCertificates(jsonResponse);
    }

    // Get Some Certificates according to page number
    const concatSomeCertificates = async (page=1, size=5) => {
        const url = `${baseURL}/api/certificates/getsomecertificates?page=${page}&size=${size}`;
        const jsonResponse = await apiCall(url, 'GET');
        if (page === 1) {
            setCertificates(jsonResponse);
        } else {
            setCertificates(certificates.concat(jsonResponse));
        }
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

    // get total number of certificates
    const getNumTotalCertificates = async () => {
        const url = `${baseURL}/api/certificates/getnumcertificates`;
        const response = await apiCall(url, 'GET');
        setNumTotalCertificates(response);
    }

    // get all fields
    const getAllFields = async () => {
        const url = `${baseURL}/api/certificates/getfields`;
        const response = await apiCall(url, 'GET');
        setAllFields(response);
    }

    return (
        <CertificateContext.Provider value={{
            certificates,
            getCertificates,
            setCertificates,
            addCertificate,
            deleteCertificate,
            concatSomeCertificates,
            certPage,
            setCertPage,
            getNumTotalCertificates,
            numTotalCertificates,
            getAllFields,
            allFields
        }}>
            {props.children}
        </CertificateContext.Provider>
    );
}

export default CertificateState;