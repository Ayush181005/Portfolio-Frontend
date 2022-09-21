import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export const ContactAdmin = (props) => {
    const { showAlert } = props;

    const baseURL = process.env.REACT_APP_SERVER_BASE_URL;
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${baseURL}/api/contacts/getcontacts`, {
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

    const handleDelete = async (id) => {
        const response = await fetch(`${baseURL}/api/contacts/deletecontact/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        });
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
            showAlert('Deleted Contact', 'success');
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
        <section className='contact-admin-section'>
            <h1>Contacts</h1>
            <Link to="/admin">admin</Link>&gt;contacts
            {contacts.length>0 ? 
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Msg</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                    {contacts.map((contact, i) => {
                        return (
                            <tr key={i}>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.msg}</td>
                                <td>{contact.timeStamp}</td>
                                <td><button className="btn btn-sm" onClick={()=>{handleDelete(contact._id)}}>Delete</button></td>
                            </tr>
                        )
                    })}
                </table>
            : <div><small>No Contacts to display</small></div>}
        </section>
    )
}