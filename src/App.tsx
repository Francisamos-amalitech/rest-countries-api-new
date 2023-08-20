import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Countries from './components/Countries';
import Country from './components/Country';
import { CountryProvider } from './components/CountryContext'; // Import the CountryProvider

const App: React.FC = () => {
  return (
    <Router>
      <CountryProvider> {/* Wrap your components with CountryProvider */}
        <Header />
        <Routes>
          <Route path="/rest-countries-api-new" element={<Countries />} />
          <Route path="/countries/:name" element={<Country />} />
        </Routes>
      </CountryProvider>
    </Router>
  );
};

export default App;






