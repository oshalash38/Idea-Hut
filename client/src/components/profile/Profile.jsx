import React, { Fragment, useEffect, useState } from 'react';
import { Banner } from '../layout/Banner';
import { CatBar } from '../layout/CatBar';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { Spinner } from '../layout/Spinner';
import { Signup } from '../auth/Signup';
import { IdeaList } from '../layout/IdeaList';
import { getIdeasByIds } from '../../actions/ideas';
import { RESET_LOADING } from '../../actions/types';

export const Profile = ({ match }) => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);
  const ideas = useSelector(state => state.ideas);
  const [profileIndex, setProfileIndex] = useState(0);
  useEffect(() => {
    if (profile.errors.status === 404) {
      return <Signup />;
    } else {
      if (profile.currProfile) {
        profile.currProfile.toJSON = () => ({
          hidden: 'to help redux devtools :)'
        });
      }
      dispatch(getProfileById(match.params.id));
    }
  }, [dispatch, match.params.id, profile.errors.status, profile.currProfile]);

  useEffect(() => {
    if (profile.currProfile) {
      // dispatch(getIdeasByIds(profile.currProfile.my_ideas));
    }
  }, [profile.currProfile, dispatch]);
  useEffect(() => {
    return () => {
      dispatch({ type: RESET_LOADING });
    };
  }, [dispatch]);

  if (profile.loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <Banner color='purple' />
      <CatBar
        page='profile'
        profileIndex={profileIndex}
        setProfileIndex={setProfileIndex}
      />
      {profileIndex === 0 ? (
        <IdeaList ideas={profile.currProfile.interacted_with} />
      ) : profileIndex === 1 ? (
        <IdeaList ideas={profile.currProfile.my_ideas} />
      ) : (
        <IdeaList ideas={profile.currProfile.bookmarked} />
      )}
    </Fragment>
  );
};
