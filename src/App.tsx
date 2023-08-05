import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Countries from './components/Countries';
import Country from './components/Country';

function App(): JSX.Element {
  return (
   <>
    <Header />
    <Countries />
   
   </>
    // <Router>
    //   <Header />
    //   <Routes>
    //     <Route path="/" element={<Countries />} />
    //     <Route path="/countries/:name" element={<Country />} />
    //   </Routes>
    // </Router>
  );
}

export default App;
