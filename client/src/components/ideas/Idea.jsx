import React, { Fragment, useEffect, useState } from 'react';
import { Banner } from '../layout/Banner';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../layout/Spinner';
import { CLEAR_CURR_IDEA } from '../../actions/types';
import { CatBar } from '../layout/CatBar';
import { getIdeaById, loadIdeaPage } from '../../actions/ideas';
import ReactQuill from 'react-quill';
import avatar from '../../img/undraw_female_avatar_w3jk.svg';
import { getCurrProfile, getProfileById } from '../../actions/profile';

export const Idea = ({ match }) => {
  const [ideaIndex, setIdeaIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const ideas = useSelector(state => state.ideas);
  const profile = useSelector(state => state.profile);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileById(auth.currUser._id));
    dispatch(getIdeaById(match.params.id));
    return () => {
      dispatch({ type: CLEAR_CURR_IDEA });
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

  if (profile.loading || ideas.loading || !ideas.currIdea) {
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
            <div className='media'>
              <img class='tiny-avatar mr-3' src={avatar} alt='...' />
              <div class='media-body'>
                <div class='card'>
                  <div class='card-header'>Omar Shalash commented</div>
                  <div class='card-body'>
                    <p class='card-text'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  </div>
                  <div class='card-footer text-muted'>on 25 June 2020</div>
                </div>
                <div class='vertical-line'></div>
                <ReactQuill />
                <span class='float-right local-btn'>
                  <button
                    class='btn btn-blue mt-3 float-right'
                    type='button'
                    name='button'
                  >
                    Add Comment
                  </button>
                </span>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};
