import React from 'react';

export const CatBar = () => {
  return (
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
  );
};
