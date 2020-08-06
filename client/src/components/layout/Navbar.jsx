import React, { Fragment } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import test_img from '../../img/undraw_female_avatar_w3jk.svg';
import { signout } from '../../actions/auth';

export const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const handleSignOut = e => {
    dispatch(signout());
    history.push('/');
  };
  if (location.pathname !== '/signin' && location.pathname !== '/signup') {
    return (
      <nav className='navbar navbar-expand-lg navbar-light '>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarTogglerDemo03'
          aria-controls='navbarTogglerDemo03'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <Link className='navbar-brand' to='/'>
          Idea Hut
        </Link>
        <div className='collapse navbar-collapse' id='navbarTogglerDemo03'>
          <ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
            {auth.isAuthenticated ? (
              <Fragment>
                <li className='nav-item'>
                  <div className='dropdown' style={{ float: 'left' }}>
                    <img
                      src={test_img}
                      alt='Avatar'
                      className='avatar-sm dropdownbtn'
                    />
                    <div className='dropdown-content'>
                      <Link
                        to={auth.currUser && `/profile/${auth.currUser._id}`}
                      >
                        My Profile
                      </Link>
                      <a href='#'>Link 2</a>
                      <a onClick={handleSignOut}>Sign Out</a>
                    </div>
                  </div>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className='nav-item active'>
                  <Link to='/signup'>
                    <button
                      className='btn btn-blue'
                      type='button'
                      name='button'
                    >
                      Sign up
                    </button>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/signin'>
                    <button
                      className='btn btn-pink'
                      type='button'
                      name='button'
                    >
                      Sign in
                    </button>
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  } else {
    return null;
  }
};
