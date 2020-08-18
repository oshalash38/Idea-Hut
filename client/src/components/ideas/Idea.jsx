import React, { Fragment, useEffect, useState } from 'react';
import { Banner } from '../layout/Banner';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../layout/Spinner';
import { CLEAR_CURR_IDEA } from '../../actions/types';
import { CatBar } from '../layout/CatBar';
import { getIdeaById } from '../../actions/ideas';

export const Idea = ({ match }) => {
  const [ideaIndex, setIdeaIndex] = useState(0);
  const ideas = useSelector(state => state.ideas);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('aywa');

    dispatch(getIdeaById(match.params.id));
    return () => {
      dispatch({ type: CLEAR_CURR_IDEA });
    };
  }, [dispatch, match.params.id]);
  if (ideas.loading || !ideas.currIdea) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <Banner color='dark-pink' />
      <CatBar page='idea' ideaIndex={ideaIndex} setIdeaIndex={setIdeaIndex} />
      {ideaIndex === 0 ? (
        <div
          className='p-5'
          dangerouslySetInnerHTML={{
            __html: ideas.currIdea.detailedDescription
          }}
        />
      ) : (
        <div>Nope</div>
      )}
    </Fragment>
  );
};
