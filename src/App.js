import React, { useEffect } from 'react';
import './App.css';
import { Route, Redirect } from "react-router-dom";
import Toolbar from './Menu/Toolbar/Toolbar';

import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import CountryAnalysis from './Pages/CountryAnalysis/CountryAnalysis';
import GDP from './Pages/EconomicData/GDP/GDP';

function App() {

  return (
    <div className="App">
      <div className="app_drawer">
        <Toolbar />
      </div>
      <Route exact path='/' component={Home} />
      <Route exact path='/about' component={About} />
      <Route exact path='/country_analysis' component={CountryAnalysis} />
      <Route exact path='/gdp' component={GDP} />
      <Route exact path='/inflation' component={GDP} /> {/* still going to GDP component */}

    </div>
  );
}

export default App;
