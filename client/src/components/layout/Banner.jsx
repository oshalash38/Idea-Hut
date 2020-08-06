import React, { Fragment } from 'react';
import img1 from '../../img/undraw_ideas_flow_cy7b.svg';
import img2 from '../../img/undraw_forming_ideas_0pav.svg';

export const Banner = props => {
  return (
    <Fragment>
      <div className='thick-line'></div>
      {props.color === 'blue' ? (
        <Fragment>
          <div className='landing-auth row'>
            <div className='col-lg-6 p-5'>
              <img
                className='landing-img sm-size'
                src={img1}
                alt='illustration'
              />
            </div>
            <div className='p-5 col-lg-6'>
              <h1 className='major-heading'>
                Discover your next project idea.
              </h1>
              <p className='general-paragraph'>
                Idea Hut is your central hub for aquiring new and innovative
                ideas from the community. You can be one of two types of users
                (or both): an inspired developer looking for ideas to put that
                sweet experience on your résumé (or just for fun) or a person
                with an amazing idea who lacks the technical knowledge to make
                it come to life.{' '}
              </p>
            </div>
          </div>
        </Fragment>
      ) : (
        <div className='landing row'>
          <div className='p-5 col-lg-6'>
            <h1 className='major-heading'>Discover your next project idea.</h1>
            <p className='general-paragraph'>
              Idea Hut is your central hub for aquiring new and innovative ideas
              from the community. You can be one of two types of users (or
              both): an inspired developer looking for ideas to put that sweet
              experience on your résumé (or just for fun) or a person with an
              amazing idea who lacks the technical knowledge to make it come to
              life.{' '}
            </p>
            <button className='btn btn-blue' type='button' name='button'>
              Sign up
            </button>
          </div>
          <div className='col-lg-6 p-5'>
            <img
              className='landing-img sm-size'
              src={img2}
              alt='illustration'
            />
          </div>
        </div>
      )}
      <div className='thick-line'></div>
    </Fragment>
  );
};
