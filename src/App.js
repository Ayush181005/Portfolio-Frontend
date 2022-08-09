import { Navbar } from './components/NavbarComponent/Navbar';
import { ContactUs } from './components/ContactUsComponent/ContactUs';
import { Footer } from './components/FooterComponent/Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

/**
 * TODO:-
 * make frontend
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
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
