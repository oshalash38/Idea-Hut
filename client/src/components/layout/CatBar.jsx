import React from 'react';

export const CatBar = props => {
  return props.page === 'home' ? (
    <ul className='nav justify-content-center cat-bar'>
      <li className='nav-item'>
        <a className='nav-link' href='#'>
          All
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link link-active' href='#'>
          Web Applications
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#'>
          Mobile Applications
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#'>
          API/Library
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#'>
          Chrome Extension
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#'>
          Machine Learning Models
        </a>
      </li>
    </ul>
  ) : props.page === 'profile' ? (
    <ul class='nav justify-content-center cat-bar'>
      <li class='nav-item'>
        <a class='nav-link link-active' href='#'>
          Interacted With
        </a>
      </li>
      <li class='nav-item'>
        <a class='nav-link' href='#'>
          My Ideas
        </a>
      </li>
      <li class='nav-item'>
        <a class='nav-link' href='#'>
          Bookmarked Ideas
        </a>
      </li>
    </ul>
  ) : (
    <ul class='nav justify-content-center cat-bar'>
      <li class='nav-item'>
        <a class='nav-link' href='#'>
          Detailed Description
        </a>
      </li>
      <li class='nav-item'>
        <a class='nav-link link-active' href='#'>
          Discussion
        </a>
      </li>
    </ul>
  );
};
