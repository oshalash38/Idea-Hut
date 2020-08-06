import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/layout/Navbar';
import { Home } from './components/home/Home';
import { Signin } from './components/auth/Signin';
import { Signup } from './components/auth/Signup';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadCurrUser } from './actions/auth';

const App = () => {
  useEffect(() => {
    store.dispatch(loadCurrUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Home} />
          <Switch>
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/signup' component={Signup} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
