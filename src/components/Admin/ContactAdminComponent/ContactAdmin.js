import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const ContactAdmin = () => {
    const host = 'localhost';
    const port = '5000';
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://${host}:${port}/api/contacts/getcontacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }
            });
            const jsonResponse = await response.json();
            setContacts(jsonResponse)
        })();
    }, []);

    return (
        <section className='contact-admin-section'>
            <h1>Contacts</h1>
            <Link to="/admin">admin</Link>&gt;contacts
            {contacts.length>0 ? 
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Msg</th>
                        <th>Actions</th>
                    </tr>
                    {contacts.map((contact, i) => {
                        return (
                            <tr key={i}>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.msg}</td>
                                <td><button className="btn btn-sm">Delete</button></td>
                            </tr>
                        )
                    })}
                </table>
            : <small>No Portfolios to display</small>}
        </section>
    )
}