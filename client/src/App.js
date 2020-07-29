import React, { Fragment } from 'react';
import './App.css';
import { Navbar } from './components/layout/Navbar';
import { Home } from './components/home/Home';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Home />
    </Fragment>
  );
};

export default App;
