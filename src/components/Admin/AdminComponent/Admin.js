import React from 'react';
import { Link } from 'react-router-dom';

export const Admin = () => {
  return (
    <>
        <h1>Admin</h1>
        <div>
            <Link to="/admin/users">Users</Link>
        </div>
        <div>
            <Link to="/admin/portfolios">Portfolios</Link>
        </div>
    </>
  )
}
