import React, { useEffect, useState } from 'react';
import { Banner } from '../layout/Banner';
import { CatBar } from '../layout/CatBar';
import { IdeaList } from '../layout/IdeaList';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrProfile } from '../../actions/profile';
import { getAllIdeas } from '../../actions/ideas';

export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrProfile());
    dispatch(getAllIdeas());
  }, [dispatch]);
  const auth = useSelector(state => state.auth);
  const ideas = useSelector(state => state.ideas);
  const [homeIndex, setHomeIndex] = useState(0);
  return (
    <div>
      <Banner color={auth.isAuthenticated ? 'blue' : 'pink'} />
      <CatBar page='home' homeIndex={homeIndex} setHomeIndex={setHomeIndex} />
      {homeIndex === 0 ? (
        <IdeaList ideas={ideas.ideas} />
      ) : homeIndex === 1 ? (
        <IdeaList
          ideas={ideas.ideas.filter(
            idea => idea.category === 'Web Applications'
          )}
        />
      ) : (
        <div> to be implemented </div>
      )}
    </div>
  );
};
