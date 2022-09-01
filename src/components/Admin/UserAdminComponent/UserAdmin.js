import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export const UserAdmin = (props) => {
    const { showAlert } = props;

    const host = process.env.REACT_APP_SERVER_HOST;
    const port = process.env.REACT_APP_SERVER_PORT;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://${host}:${port}/api/auth/getusers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }
            });
            const jsonResponse = await response.json();
            setUsers(jsonResponse)
        })();
    }, []);

    const handleDelete = async (id) => {
        const response = await fetch(`http://${host}:${port}/api/auth/deleteuser/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        });
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
            showAlert('Deleted User', 'success');
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
        <section className='user-admin-section'>
            <h1>Contacts</h1>
            <Link to="/admin">admin</Link>&gt;users
            {users.length>0 ?
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password Hash</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                    {users.map((user, i) => {
                        return (
                            <tr key={i}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password.substring(0, 10)}...</td>
                                <td>{user.date}</td>
                                <td>{user.type}</td>
                                <td><button className="btn btn-sm" onClick={()=>{handleDelete(user._id)}}>Delete</button></td>
                            </tr>
                        )
                    })}
                </table>
            : <div><small>No Users to display</small></div>}
        </section>
    )
}