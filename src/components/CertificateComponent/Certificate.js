import React, { useContext, useEffect, useState } from 'react'
import './Certificate.css'
import { Card } from '../CardComponent/Card'
import CertificateContext from '../../context/certificates/CertificateContext'
import { Spinner } from '../SpinnerComponent/Spinner'
import { Helmet } from "react-helmet"

export const Certificate = (props) => {
    const [loading, setLoading] = useState(true);
    const { certificates, getCertificates } = useContext(CertificateContext);
    const { setLoadingBarProgress } = props;
    useEffect(() => {
        setLoadingBarProgress(50);
        getCertificates()
        .then(()=>{setLoadingBarProgress(100);setLoading(false);});
    }, []); // Get certificates on mount

    // Add all the unique years of certificates to an array
    const allCertificateYears = [];
    certificates.forEach(certificate => {
        if (!allCertificateYears.includes(certificate.year)) {
            allCertificateYears.push(certificate.year);
        }
    })
    allCertificateYears.sort(); // Sort the array in ascending order
    allCertificateYears.reverse(); // Sort the array in descending order

    const pageTitle = 'My Certificates - Ayush';
    const pageDesc = 'Certificates are just a piece of paper, here they are put up as a bunch of pixels, But their value is a lot. They are the proof of our success in certain fields, which obviously cannot be shown by only a bunch of pixels, but here they are.'

    return (
        <section className="certificates-section">
            <Helmet>
                {/* Ganeral tags */}
                <title>{pageTitle}</title>
                <link rel="canonical" href={`${process.env.REACT_APP_DOMAIN_URL}/certificates`} />
                <meta name="description" content={pageDesc} />

                {/* OpenGraph tags */}
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDesc} />
                <meta property="og:type" content="website" />

                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:creator" content="@Ayush181005" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDesc} />
            </Helmet>
            <div className="certificates-container">
                <h1>Certificates</h1>
                {loading && <Spinner />}
                {!loading && certificates.length>0 ? allCertificateYears.map((year, i) => {
                    return (
                        <div key={i}>
                            {year ? <h2 className="text-certificate-year">{year} <span className='badge'>Age: {year-2005} years</span></h2> : <h2 className="text-certificate-year">Other</h2>}
                            {certificates.map((certificate, i) => {
                                if (certificate.year === year) {
                                    const base64String = btoa(new Uint8Array(certificate.img.data.data).reduce(function (data, byte) { return data + String.fromCharCode(byte); }, ''));
                                    return(
                                        <Card key={i} text={certificate.compName} extraInfo={certificate.field} badgeIcon={certificate.winner} img_url={`data:image/png;base64,${base64String}`} showImg={true} />
                                    )
                                }
                            })}
                        </div>
                    )
                }) : <h2>{!loading && 'No certificates found'}</h2>}
            </div>
        </section>
    )
}
