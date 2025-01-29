import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Donate from './components/Donate';
import Investments from './components/Investments';
import Dashboard from './components/Dashboard';
import Start from './components/Start';
import Home from './components/Home';
import Profile from './components/Profile';
import CardDetails from './components/CardDetails';
import PaymentPage from './components/PaymentPage';

function App() {
  return (
    <>
    <Router>
    <Navbar />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/donate" element={<Donate />} />
    <Route path="/investments" element={<Investments />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/start-fund" element={<Start />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/card/:id" element={<CardDetails />} /> 
    <Route path="/payment/:id" element={<PaymentPage />} />
    </Routes>
    <Footer />
    </Router>
    </>
  );
}

export default App;
