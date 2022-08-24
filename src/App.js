import { Navbar } from './components/NavbarComponent/Navbar';
import { ContactUs } from './components/ContactUsComponent/ContactUs';
import { AboutMe } from './components/AboutMeComponent/AboutMe';
import { Footer } from './components/FooterComponent/Footer';
import { Portfolio } from './components/PortfolioComponent/Portfolio';
import { Certificate } from './components/CertificateComponent/Certificate';
import { PortfolioDetail } from './components/PortfolioDetailComponent/PortfolioDetail';
import { Signin } from './components/SigninComponent/Signin';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import PortfolioState from './context/portfolios/PortfolioState';

/**
 * TODO:-
 * make frontend, lazy loading images
 * make backend
 * use concurrently to run backend and frontend simultaneously (video 55 cwh)
 */

function App() {
  return (
    <PortfolioState>
      <Router>
        <Navbar />

        <main>
          <Routes>
            <Route exact path="/" element={<Portfolio />}/>
            <Route exact path="/contact" element={<ContactUs />}/>
            <Route exact path="/about" element={<AboutMe />}/>
            <Route exact path="/certificate" element={<Certificate />}/>
            <Route exact path="/portfolio/:slug" element={<PortfolioDetail />} />
            <Route exact path="/signin" element={<Signin />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </PortfolioState>
  );
}

export default App;
