import React from 'react';

export const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light '>
      <button
        class='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarTogglerDemo03'
        aria-controls='navbarTogglerDemo03'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <a className='navbar-brand' href='#'>
        Idea Hut
      </a>
      <div className='collapse navbar-collapse' id='navbarTogglerDemo03'>
        <ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
          <li className='nav-item active'>
            <a href='signup.html'>
              <button className='btn btn-blue' type='button' name='button'>
                Sign up
              </button>
            </a>
          </li>
          <li className='nav-item'>
            <a href='signin.html'>
              <button className='btn btn-pink' type='button' name='button'>
                Sign in
              </button>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
