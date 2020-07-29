import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  if (location.pathname !== '/signin' && location.pathname !== '/signup') {
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
              <Link to='/signup'>
                <button className='btn btn-blue' type='button' name='button'>
                  Sign up
                </button>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/signin'>
                <button className='btn btn-pink' type='button' name='button'>
                  Sign in
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  } else {
    return null;
  }
};
