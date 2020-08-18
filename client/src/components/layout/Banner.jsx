import React, { Fragment, useState, useEffect } from 'react';
import img1 from '../../img/undraw_ideas_flow_cy7b.svg';
import img2 from '../../img/undraw_forming_ideas_0pav.svg';
import img3 from '../../img/undraw_new_ideas_jdea.svg';
import testAvatar from '../../img/undraw_male_avatar_323b.svg';
import { useSelector, useDispatch } from 'react-redux';
import { likeIdea, bookmarkIdea } from '../../actions/ideas';
import { getProfileById } from '../../actions/profile';

export const Banner = props => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);
  const ideas = useSelector(state => state.ideas);
  const auth = useSelector(state => state.auth);
  let b64 = null;
  let mimeType = null;
  if (profile.currProfile && profile.currProfile.profile_picture) {
    const buffer = profile.currProfile.profile_picture;
    b64 = new Buffer(buffer).toString('base64');
    mimeType = 'image/jpeg';
  }

  const like = e => {
    dispatch(likeIdea(ideas.currIdea._id));
  };

  const handleBookmarked = e => {
    dispatch(bookmarkIdea(ideas.currIdea._id));
    props.setBookmarked(true);
  };

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
      ) : props.color === 'pink' ? (
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
      ) : props.color === 'purple' ? (
        <div className='profile-top row'>
          <div className='p-3 col-lg-12'>
            <img
              className='avatar'
              src={
                mimeType && b64 ? `data:${mimeType};base64,${b64}` : testAvatar
              }
              alt=''
            />
            <h1 className='major-heading'>{profile.currProfile.username}</h1>
            <p className='general-paragraph'>{profile.currProfile.bio}</p>
            {profile.currProfile.socials.website && (
              <i className='fas fa-globe fa-2x p-1'></i>
            )}
            {profile.currProfile.socials.github && (
              <i className='fab fa-github fa-2x p-1'></i>
            )}
            {profile.currProfile.socials.facebook && (
              <i className='fab fa-facebook fa-2x p-1'></i>
            )}
            {profile.currProfile.socials.twitter && (
              <i className='fab fa-twitter fa-2x p-1'></i>
            )}
            {profile.currProfile.socials.youtube && (
              <i className='fab fa-youtube fa-2x p-1'></i>
            )}
            {profile.currProfile.socials.linkedin && (
              <i className='fab fa-linkedin fa-2x p-1'></i>
            )}
          </div>
        </div>
      ) : (
        <div className='idea-top row p-5'>
          <div className='col-lg-6'>
            <h1 className='major-heading'>{ideas.currIdea.title}</h1>
            <p className='general-paragraph'>
              {ideas.currIdea.shortDescription}
            </p>
            <h2>
              <span className='badge purple'>{ideas.currIdea.category}</span>
            </h2>
            <div className='top-padding'>
              <div className='top-padding'>
                <i
                  className='fab fa-gratipay fa-2x local-btn'
                  onClick={like}
                ></i>
                <span className='side-number'>
                  {' '}
                  {ideas.currIdea.likes.length}
                </span>
              </div>
              <div className='top-padding'>
                <i className='fas fa-comments fa-2x'></i>
                <span className='side-number'>
                  {' '}
                  {ideas.currIdea.comments.length}
                </span>
              </div>
            </div>
            <div className='top-padding-some'>
              <span>
                {props.bookmarked ? (
                  <div>Bookmarked</div>
                ) : (
                  <button
                    className='btn btn-blue right-margin'
                    type='button'
                    name='button'
                    onClick={handleBookmarked}
                  >
                    Bookmark
                  </button>
                )}
              </span>
              <a href='signin.html'>
                <button className='btn btn-pink' type='button' name='button'>
                  I'll Do It!
                </button>
              </a>
            </div>
          </div>
          <div className='col-lg-6'>
            <img className='landing-img xsm-size' src={img3} alt='' />
          </div>
        </div>
      )}
      <div className='thick-line'></div>
    </Fragment>
  );
};
