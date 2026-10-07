import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Offerings from './pages/Offerings';
import Booking from './pages/Booking';
import Nav from './components/Nav';

function PrivateRoute({ children }) {
  // simple wrapper; AuthContext logic is inside Nav/page components
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/offerings" element={<PrivateRoute><Offerings /></PrivateRoute>} />
            <Route path="/book" element={<PrivateRoute><Booking /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
