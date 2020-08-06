import React, { Fragment, useEffect } from 'react';
import { Banner } from '../layout/Banner';
import { CatBar } from '../layout/CatBar';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { Spinner } from '../layout/Spinner';

export const Profile = ({ match }) => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);
  useEffect(() => {
    dispatch(getProfileById(match.params.id));
  }, [dispatch, match.params.id]);
  return profile.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Banner color='purple' />
      <CatBar page='profile' />
    </Fragment>
  );
};
