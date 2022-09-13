import { useState } from 'react';
import { Home } from './components/HomeComponent/Home';
import { Navbar } from './components/NavbarComponent/Navbar';
import { ContactUs } from './components/ContactUsComponent/ContactUs';
import { AboutMe } from './components/AboutMeComponent/AboutMe';
import { Footer } from './components/FooterComponent/Footer';
import { Portfolio } from './components/PortfolioComponent/Portfolio';
import { PortfolioDetail } from './components/PortfolioDetailComponent/PortfolioDetail';
import { Signin } from './components/SigninComponent/Signin';
import { Alert } from './components/AlertComponent/Alert';
import { Admin } from './components/Admin/AdminComponent/Admin';
import { Certificate } from './components/CertificateComponent/Certificate';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import PortfolioState from './context/portfolios/PortfolioState';
import CertificateState from './context/certificates/CertificateState';
import LoadingBar from 'react-top-loading-bar';

function App() {
  const host = process.env.REACT_APP_SERVER_HOST;
  const port = process.env.REACT_APP_SERVER_PORT;

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

  // React top loading bar
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);

  return (
    <PortfolioState><CertificateState> {/* Context API */}
      <Router>
        <LoadingBar
          color='#333'
          height={3}
          progress={loadingBarProgress}
          onLoaderFinished={()=>setLoadingBarProgress(0)}
        />
        <Navbar getUserData={getUserData} userData={userData} />

        <main>
          <Routes>
            <Route exact path="/" element={
              <Home setLoadingBarProgress={setLoadingBarProgress}/>
            } />
            <Route exact path="/contact" element={
              <ContactUs showAlert={showAlert} setLoadingBarProgress={setLoadingBarProgress}/>
            } />
            <Route exact path="/about" element={
              <AboutMe setLoadingBarProgress={setLoadingBarProgress}/>
            } />
            <Route exact path="/signin" element={
              <Signin showAlert={showAlert} />
            } />
            {/* Portfolio */}
            <Route exact path="/portfolio" element={
              <Portfolio setLoadingBarProgress={setLoadingBarProgress} />
            } />
            <Route exact path="/portfolio/:slug" element={
              <PortfolioDetail setLoadingBarProgress={setLoadingBarProgress}/>
            } />
            {/* Certificates */}
            <Route exact path="/certificates" element={
              <Certificate setLoadingBarProgress={setLoadingBarProgress}/>
            } />
            {/* Admin */}
            <Route path="/admin/*" element={
              <Admin showAlert={showAlert} getUserData={getUserData} userData={userData} />
            } />
          </Routes>
        </main>

        {alert && <Alert alert={alert} />}

        <Footer />
      </Router>
    </CertificateState></PortfolioState>
  );
}

export default App;
