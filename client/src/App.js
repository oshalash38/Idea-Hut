import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/layout/Navbar';
import { Home } from './components/home/Home';
import { Signin } from './components/auth/Signin';
import { Signup } from './components/auth/Signup';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import { loadCurrUser } from './actions/auth';
import { Profile } from './components/profile/Profile';
import { Spinner } from './components/layout/Spinner';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
const App = () => {
  const auth = useSelector(state => state.auth);
  useEffect(() => {
    store.dispatch(loadCurrUser());
  }, []);
  return auth.loading ? (
    <Spinner />
  ) : (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/profile/:id' component={Profile} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default AppWrapper;
