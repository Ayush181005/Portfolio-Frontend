import { Navbar } from './components/NavbarComponent/Navbar';
import { ContactUs } from './components/ContactUsComponent/ContactUs';
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

      <Routes>
        <Route exact path="/contact" element={<ContactUs />}/>
      </Routes>
    </Router>
  );
}

export default App;
