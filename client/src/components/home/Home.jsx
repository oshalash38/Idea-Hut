import React from 'react';
import { Banner } from '../layout/Banner';
import { CatBar } from '../layout/CatBar';
import { IdeaList } from '../layout/IdeaList';

export const Home = () => {
  return (
    <div>
      <Banner />
      <CatBar />
      <IdeaList />
    </div>
  );
};
