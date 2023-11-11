
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import BrewerySearch from './components/BrewerySearch';
import BreweryDetails from './components//BreweryDetails';
import ReviewForm from './components/ReviewForm';

function App() {
  return (
    <Router>
      <div>
        {/* Signup component outside of the switch */}
        
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Use Outlet to render nested routes */}
          <Route path="/" element={<Outlet />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<BrewerySearch />} />
            <Route path="/breweries/:id" element={<BreweryDetails />} />
            <Route path="/add-review/:id" element={<ReviewForm />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;






