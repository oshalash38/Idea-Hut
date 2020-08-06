import React, { useState } from 'react';
import { PinkButton } from '../buttons/PinkButton';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signin } from '../../actions/auth';
import { Alert } from '../layout/Alert';

export const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signin(formData));
  };

  if (auth.isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <div class='row'>
      <div class='col-6 p-5'>
        <a class='navbar-brand' href='#'>
          Idea Hut
        </a>
        <h2 class='minor-heading'>Log in to your account</h2>
        <Alert />
        <form onSubmit={handleSubmit}>
          <div class='form-group'>
            <label for='InputEmail1'>Email Address</label>
            <input
              name='email'
              type='email'
              class='form-control'
              id='InputEmail1'
              aria-describedby='emailHelp'
              placeholder='Enter email'
              onChange={handleChange}
            />
            <small id='emailHelp' class='form-text text-muted'>
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class='form-group'>
            <label for='InputPassword1'>Password</label>
            <input
              name='password'
              type='password'
              class='form-control'
              id='InputPassword1'
              placeholder='Password'
              onChange={handleChange}
            />
          </div>
          <a href='profile.html'>
            <PinkButton text='Sign in' />
          </a>
        </form>
      </div>
      <div class='col-6 right-auth'></div>
    </div>
  );
};
