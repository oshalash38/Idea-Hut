import React from 'react';
import { useSelector } from 'react-redux';

export const CatBar = props => {
  const ideas = useSelector(state => state.ideas);
  const handleClick = e => {
    props.setIdeaIndex &&
      props.setIdeaIndex(Number(e.target.getAttribute('name')));
    props.setProfileIndex &&
      props.setProfileIndex(Number(e.target.getAttribute('name')));
  };
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
        <span
          name='0'
          onClick={handleClick}
          className={
            props.profileIndex === 0 ? 'nav-link link-active' : 'nav-link'
          }
        >
          Interacted With
        </span>
      </li>
      <li class='nav-item'>
        <span
          name='1'
          onClick={handleClick}
          className={
            props.profileIndex === 1 ? 'nav-link link-active' : 'nav-link'
          }
        >
          My Ideas
        </span>
      </li>
      <li class='nav-item'>
        <span
          name='2'
          onClick={handleClick}
          className={
            props.profileIndex === 2 ? 'nav-link link-active' : 'nav-link'
          }
        >
          Bookmarked Ideas
        </span>
      </li>
    </ul>
  ) : (
    <ul class='nav justify-content-center cat-bar'>
      <li class='nav-item'>
        <span
          name='0'
          onClick={handleClick}
          className={
            props.ideaIndex === 0 ? 'nav-link link-active' : 'nav-link'
          }
        >
          Detailed Description
        </span>
      </li>
      <li class='nav-item'>
        <span
          name='1'
          className={
            props.ideaIndex === 1 ? 'nav-link link-active' : 'nav-link'
          }
          onClick={handleClick}
        >
          Discussion
        </span>
      </li>
    </ul>
  );
};
