import React from 'react';

export const Signup = () => {
  return (
    <div class='row'>
      <div class='col-6 left-auth'></div>
      <div class='col-6 p-5'>
        <a class='navbar-brand' href='#'>
          Idea Hut
        </a>
        <h2 class='minor-heading'>Create your account</h2>
        <form>
          <div class='form-group'>
            <label for='InputUsername'>Username</label>
            <input
              type='text'
              class='form-control'
              id='InputUsername'
              required
            />
          </div>
          <div class='form-group'>
            <label for='InputEmail1'>Email Address</label>
            <input
              type='email'
              class='form-control'
              id='InputEmail1'
              aria-describedby='emailHelp'
              required
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
              required
            />
            <small id='passwordHelp' class='form-text text-muted'>
              Must be at least 6 characters.
            </small>
          </div>
          <div class='form-group'>
            <label for='InputPassword2'>Re-enter Password</label>
            <input
              type='password'
              class='form-control'
              id='InputPassword2'
              required
            />
          </div>
          <button type='submit' class='btn btn-blue'>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};
