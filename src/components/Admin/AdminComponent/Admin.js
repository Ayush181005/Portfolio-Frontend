import React, { useEffect } from 'react';
import {
  Link,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import { PortfolioAdmin } from '../PortfolioAdminComponent/PortfolioAdmin';
import { PortfolioAdd } from '../PortfolioAddComponent/PortfolioAdd';
import { PortfolioEdit } from '../PortfolioEditComponent/PortfolioEdit';
import { ContactAdmin } from '../ContactAdminComponent/ContactAdmin';
import { UserAdmin } from '../UserAdminComponent/UserAdmin';
import { CertificateAdmin } from '../CertificateAdminComponent/CertificateAdmin';
import { CertificateAdd } from '../CertificateAddComponent/CertificateAdd';
import { Helmet } from 'react-helmet';

export const Admin = (props) => {
  const navigate = useNavigate();

  const { showAlert, getUserData } = props;

  // If on admin page and not logged in as superuser, redirect to home page
  useEffect(() => {
    const myFunc = async () => {
      if (!localStorage.getItem('auth-token')){
        showAlert("Access Denied", "error");
        navigate('/');
        return;
      }
      else {
        const myData = await getUserData();
        if(myData.user.type !== 'superuser') {
          showAlert("Access Denied", "error");
          navigate('/');
          return;
        }
      }
    }
    myFunc();
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin - Ayush</title>
      </Helmet>

      <h1>Admin</h1>
      <div>
        <Link to="/admin/users">Users</Link>
      </div>
      <div>
        <Link to="/admin/portfolios">Portfolios</Link>
      </div>
      <div>
        <Link to="/admin/certificates">Certificates</Link>
      </div>
      <div>
        <Link to="/admin/contacts">Contacts</Link>
      </div>

      <hr />

      <Routes>
        <Route path="contacts" element={<ContactAdmin showAlert={showAlert} />} />
        <Route path="users" element={<UserAdmin showAlert={showAlert} />} />
        <Route path="portfolios" element={<PortfolioAdmin showAlert={showAlert} />} />
        <Route path="portfolios/add" element={<PortfolioAdd showAlert={showAlert} />} />
        <Route path="portfolios/edit/:id" element={<PortfolioEdit showAlert={showAlert} />} />
        <Route path="certificates" element={<CertificateAdmin showAlert={showAlert} />} />
        <Route path="certificates/add" element={<CertificateAdd showAlert={showAlert} />} />
      </Routes>
    </>
  )
}
