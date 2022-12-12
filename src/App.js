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
import { ImgDisplay } from './components/ImgDisplayComponent/ImgDisplay';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import PortfolioState from './context/portfolios/PortfolioState';
import CertificateState from './context/certificates/CertificateState';
import GeneralState from './context/general/GeneralState'
import LoadingBar from 'react-top-loading-bar';
// Fontawesome icons:-
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMedal, faLink, faBlog, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faFreeCodeCamp, faGithub, faStackOverflow, faYoutube } from '@fortawesome/free-brands-svg-icons';

function App() {
  const baseURL = process.env.REACT_APP_SERVER_BASE_URL;

  // Adding fontawesome icons to the library to use in other components
  library.add(faMedal, faFreeCodeCamp, faGithub, faStackOverflow, faYoutube, faLink, faBlog, faXmark);

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
    const response = await fetch(`${baseURL}/api/auth/getuser`, {
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
    <PortfolioState><CertificateState><GeneralState> {/* Context API */}
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

          <ImgDisplay />
        </main>

        {alert && <Alert alert={alert} />}

        <Footer />
      </Router>
    </GeneralState></CertificateState></PortfolioState>
  );
}

export default App;
