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

export const Admin = (props) => {
  const navigate = useNavigate();

  const { showAlert, getUserData } = props;

  // If on admin page and not logged in as superuser, redirect to home page
  useEffect(() => {
    document.title = 'Admin';

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
      <h1>Admin</h1>
      <div>
        <Link to="/admin/users">Users</Link>
      </div>
      <div>
        <Link to="/admin/portfolios">Portfolios</Link>
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
      </Routes>
    </>
  )
}
