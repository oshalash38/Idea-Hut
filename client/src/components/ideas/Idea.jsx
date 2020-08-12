import React, { Fragment } from 'react';
import { Banner } from '../layout/Banner';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../layout/Spinner';
import { CatBar } from '../layout/CatBar';

export const Idea = () => {
  const ideas = useSelector(state => state.ideas);
  if (ideas.loading) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <Banner color='dark-pink' />
      <CatBar page='idea' />
    </Fragment>
  );
};
