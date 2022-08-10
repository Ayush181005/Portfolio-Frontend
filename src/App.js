import { Navbar } from './components/NavbarComponent/Navbar';
import { ContactUs } from './components/ContactUsComponent/ContactUs';
import { AboutMe } from './components/AboutMeComponent/AboutMe';
import { Footer } from './components/FooterComponent/Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

/**
 * TODO:-
 * make frontend, lazy loading images
 * make backend
 * use concurrently to run backend and frontend simultaneously (video 55 cwh)
 */

function App() {
  return (
    <Router>
      <Navbar />

      <main>
        <Routes>
          <Route exact path="/contact" element={<ContactUs />}/>
          <Route exact path="/about" element={<AboutMe />}/>

          {/* <Route path="*" element={<PageNotFound />} status={404} />  // TODO: https://stackoverflow.com/a/40805821/15543100*/}
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
