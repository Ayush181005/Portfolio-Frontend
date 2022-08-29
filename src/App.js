import { Navbar } from './components/NavbarComponent/Navbar';
import { ContactUs } from './components/ContactUsComponent/ContactUs';
import { AboutMe } from './components/AboutMeComponent/AboutMe';
import { Footer } from './components/FooterComponent/Footer';
import { Portfolio } from './components/PortfolioComponent/Portfolio';
import { PortfolioDetail } from './components/PortfolioDetailComponent/PortfolioDetail';
import { Signin } from './components/SigninComponent/Signin';
import { Alert } from './components/AlertComponent/Alert';
import { Admin } from './components/Admin/AdminComponent/Admin';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import PortfolioState from './context/portfolios/PortfolioState';
import { useState } from 'react';

/**
 * TODO:-
 * make frontend, lazy loading images
 * make backend
 * use concurrently to run backend and frontend simultaneously (video 55 cwh)
 */

function App() {
  const host = "localhost";
  const port = "5000";

  // Alert functionality
  const [alert, setAlert] = useState(null);
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }

  // Get User Data
  const [userData, setUserData] = useState({});
  const getUserData = async () => {
    if (!localStorage.getItem('auth-token')) {
      return;
    }
    const response = await fetch(`http://${host}:${port}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      }
    });
    const jsonResponse = await response.json();
    setUserData(jsonResponse);
    return jsonResponse;
  };

  return (
    <PortfolioState>
      <Router>
        <Navbar getUserData={getUserData} userData={userData} />

        <main>
          <Routes>
            <Route exact path="/" element={<Portfolio />}/>
            <Route exact path="/contact" element={<ContactUs />}/>
            <Route exact path="/about" element={<AboutMe />}/>
            <Route exact path="/portfolio/:slug" element={<PortfolioDetail />} />
            <Route exact path="/signin" element={<Signin showAlert={showAlert} />} />

            {/* Admin */}
            <Route path="/admin/*" element={
              <Admin showAlert={showAlert} getUserData={getUserData} userData={userData} />
            } />
          </Routes>
        </main>

        {alert && <Alert alert={alert} />}

        <Footer />
      </Router>
    </PortfolioState>
  );
}

export default App;
