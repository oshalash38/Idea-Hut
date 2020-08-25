import React from 'react';
import { useSelector } from 'react-redux';
import {
  mainCategories,
  profileCategories,
  ideaCategories
} from '../../constants/categories';

export const CatBar = props => {
  const ideas = useSelector(state => state.ideas);
  const handleClick = e => {
    props.setIdeaIndex &&
      props.setIdeaIndex(Number(e.target.getAttribute('name')));
    props.setProfileIndex &&
      props.setProfileIndex(Number(e.target.getAttribute('name')));
    props.setHomeIndex &&
      props.setHomeIndex(Number(e.target.getAttribute('name')));
  };
  return props.page === 'home' ? (
    <ul className='nav justify-content-center cat-bar'>
      {mainCategories.map((category, index) => (
        <li className='nav-item' key={index}>
          <span
            className={
              props.homeIndex === index
                ? 'nav-link link-active'
                : 'nav-link local-btn'
            }
            onClick={handleClick}
            name={index}
          >
            {category}
          </span>
        </li>
      ))}
    </ul>
  ) : props.page === 'profile' ? (
    <ul className='nav justify-content-center cat-bar'>
      {profileCategories.map((category, index) => (
        <li className='nav-item' key={index}>
          <span
            name={index}
            onClick={handleClick}
            className={
              props.profileIndex === index
                ? 'nav-link link-active'
                : 'nav-link local-btn'
            }
          >
            {category}
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <ul className='nav justify-content-center cat-bar'>
      {ideaCategories.map((category, index) => (
        <li key={index} className='nav-item'>
          <span
            name={index}
            onClick={handleClick}
            className={
              props.ideaIndex === index
                ? 'nav-link link-active'
                : 'nav-link local-btn'
            }
          >
            {category}
          </span>
        </li>
      ))}
    </ul>
  );
};
