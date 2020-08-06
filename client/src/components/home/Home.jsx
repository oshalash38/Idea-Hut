import React from 'react';
import { Banner } from '../layout/Banner';
import { CatBar } from '../layout/CatBar';
import { IdeaList } from '../layout/IdeaList';
import { useSelector } from 'react-redux';

export const Home = () => {
  const auth = useSelector(state => state.auth);
  return (
    <div>
      <Banner color={auth.isAuthenticated ? 'blue' : 'pink'} />
      <CatBar />
      <IdeaList />
    </div>
  );
};
