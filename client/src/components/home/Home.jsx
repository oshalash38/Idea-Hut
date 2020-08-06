import React, { useEffect } from 'react';
import { Banner } from '../layout/Banner';
import { CatBar } from '../layout/CatBar';
import { IdeaList } from '../layout/IdeaList';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrProfile } from '../../actions/profile';

export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrProfile());
  }, []);
  const auth = useSelector(state => state.auth);
  return (
    <div>
      <Banner color={auth.isAuthenticated ? 'blue' : 'pink'} />
      <CatBar />
      <IdeaList />
    </div>
  );
};
