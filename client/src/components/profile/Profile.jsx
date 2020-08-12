import React, { Fragment, useEffect } from 'react';
import { Banner } from '../layout/Banner';
import { CatBar } from '../layout/CatBar';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { Spinner } from '../layout/Spinner';
import { Signup } from '../auth/Signup';

export const Profile = ({ match }) => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);
  useEffect(() => {
    if (profile.errors.status === 404) {
      return <Signup />;
    } else {
      dispatch(getProfileById(match.params.id));
    }
  }, [dispatch, match.params.id]);
  if (profile.loading) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <Banner color='purple' />
      <CatBar page='profile' />
    </Fragment>
  );
};
