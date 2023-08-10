
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Login from './pages/login';
import LoginTest from './pages/LoginTest';


import Administrateur from './pages/Administrateur';
import DirecteurServiceTopographique from './pages/DirecteurServiceTopographique';
import ConservateurNationale from './pages/ConservateurNationale';
import ChefServiceRegionaleTopographique from './pages/ChefServiceRegionaleTopographique';
import ChefCirconscriptionTopographique from './pages/ChefCirconscriptionTopographique';


function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/loginTest" element={<LoginTest />}></Route>

        <Route path="/Administrateur" element={<Administrateur />} />
        <Route path="/DirecteurServiceTopographique" element={<DirecteurServiceTopographique />} />
        <Route path="/ConservateurNationale" element={<ConservateurNationale />} />
        <Route path="/ChefServiceRegionaleTopographique" element={<ChefServiceRegionaleTopographique />} />
        <Route path="/ChefCirconscriptionTopographique" element={<ChefCirconscriptionTopographique />} />

      </Routes >
    </BrowserRouter>

  );

}

export default App;
