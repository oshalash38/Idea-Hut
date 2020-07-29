import React from 'react';

export const Signin = () => {
  return (
    <div class='row'>
      <div class='col-6 p-5'>
        <a class='navbar-brand' href='#'>
          Idea Hut
        </a>
        <h2 class='minor-heading'>Log in to your account</h2>
        <form>
          <div class='form-group'>
            <label for='InputEmail1'>Email Address</label>
            <input
              type='email'
              class='form-control'
              id='InputEmail1'
              aria-describedby='emailHelp'
              placeholder='Enter email'
            />
            <small id='emailHelp' class='form-text text-muted'>
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class='form-group'>
            <label for='InputPassword1'>Password</label>
            <input
              type='password'
              class='form-control'
              id='InputPassword1'
              placeholder='Password'
            />
          </div>
          <a href='profile.html'>
            <button type='submit' class='btn btn-pink'>
              Sign in
            </button>
          </a>
        </form>
      </div>
      <div class='col-6 right-auth'></div>
    </div>
  );
};
