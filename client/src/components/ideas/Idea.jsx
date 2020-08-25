import React, { Fragment, useEffect, useState } from 'react';
import { Banner } from '../layout/Banner';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../layout/Spinner';
import { CLEAR_CURR_IDEA, RESET_LOADING } from '../../actions/types';
import { CatBar } from '../layout/CatBar';
import { getIdeaById, loadIdeaPage, addComment } from '../../actions/ideas';
import ReactQuill from 'react-quill';
import testAvatar from '../../img/undraw_female_avatar_w3jk.svg';
import { getCurrProfile, getProfileById } from '../../actions/profile';
import { IdeaCard } from './IdeaCard';
import { fireAlert } from '../../actions/alert';
import { Alert } from '../layout/Alert';
import { Link } from 'react-router-dom';

export const Idea = ({ match }) => {
  const [ideaIndex, setIdeaIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [currProfile, setProfile] = useState(null);
  const ideas = useSelector(state => state.ideas);
  const profile = useSelector(state => state.profile);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [comment, setComment] = useState({ text: null });
  let b64 = null;
  let mimeType = null;
  if (profile.currProfile && profile.currProfile.profile_picture) {
    const buffer = profile.currProfile.profile_picture;
    b64 = new Buffer(buffer).toString('base64');
    mimeType = 'image/jpeg';
  }

  useEffect(() => {
    auth.currUser && dispatch(getProfileById(auth.currUser._id));
    dispatch(getIdeaById(match.params.id));
    return () => {
      dispatch({ type: CLEAR_CURR_IDEA });
      dispatch({ type: RESET_LOADING });
    };
  }, []);

  useEffect(() => {
    if (profile.currProfile && ideas.currIdea) {
      profile.currProfile.bookmarked.forEach(idea => {
        if (idea._id === ideas.currIdea._id) {
          setBookmarked(true);
        }
      });
      ideas.currIdea.likes.forEach(like => {
        if (like.user === auth.currUser._id) {
          setLiked(true);
        }
      });
    }
  }, [profile.currProfile, ideas.currIdea]);

  // useEffect(() => {
  //   if (ideaIndex === 1) {
  //   }
  // }, [ideaIndex]);

  const handleChange = e => {
    setComment({ text: e });
  };

  const handleAddComment = e => {
    if (comment.text) {
      dispatch(addComment(match.params.id, comment));
      setComment({ text: null });
    } else {
      dispatch(fireAlert('danger', 'Comment cannot be blank'));
    }
  };

  if (
    (auth.isAuthenticated && profile.loading) ||
    ideas.loading ||
    !ideas.currIdea
  ) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <Banner
        color='dark-pink'
        setBookmarked={setBookmarked}
        bookmarked={bookmarked}
        liked={liked}
        setLiked={setLiked}
      />
      <CatBar page='idea' ideaIndex={ideaIndex} setIdeaIndex={setIdeaIndex} />
      <div className='p-5'>
        {ideaIndex === 0 ? (
          <div
            dangerouslySetInnerHTML={{
              __html: ideas.currIdea.detailedDescription
            }}
          />
        ) : (
          <Fragment>
            <Alert />
            {ideas.currIdea.comments.map(comment => {
              {
                /* dispatch(getProfileById(comment.user)); */
              }
              return (
                <IdeaCard
                  key={comment._id}
                  username={comment.username}
                  text={comment.text}
                  profilePicture={comment.profile_picture}
                  date={comment.date}
                  id={comment.user}
                />
              );
            })}

            {auth.isAuthenticated ? (
              <div className='media'>
                <img
                  class='tiny-avatar mr-3'
                  src={
                    mimeType && b64
                      ? `data:${mimeType};base64,${b64}`
                      : testAvatar
                  }
                  alt='...'
                />
                <div className='media-body'>
                  <ReactQuill value={comment.text} onChange={handleChange} />
                  <span class='float-right local-btn'>
                    <span
                      onClick={handleAddComment}
                      class='btn btn-blue mt-3 float-right'
                      type='button'
                      name='button'
                    >
                      Add Comment
                    </span>
                  </span>
                </div>
              </div>
            ) : (
              <div className='media'>
                <div className='tiny-avatar mr-3'></div>
                <div className='media-body'>
                  <div class='alert alert-warning' role='alert'>
                    <Link to='/signin'>
                      <button
                        className='btn btn-pink'
                        type='button'
                        name='button'
                      >
                        Sign in
                      </button>
                    </Link>{' '}
                    or{' '}
                    <Link to='/signup'>
                      <button
                        className='btn btn-blue'
                        type='button'
                        name='button'
                      >
                        Sign up
                      </button>
                    </Link>{' '}
                    to comment!
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};
