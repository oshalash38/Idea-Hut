import React, { useEffect, useState } from 'react';
import { Banner } from '../layout/Banner';
import { CatBar } from '../layout/CatBar';
import { IdeaList } from '../layout/IdeaList';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrProfile } from '../../actions/profile';
import { getAllIdeas, getIdeaBatch } from '../../actions/ideas';
import { mainCategories } from '../../constants/categories';
import { RESET_LOADING } from '../../actions/types';
import { Spinner } from '../layout/Spinner';

export const Home = () => {
  const dispatch = useDispatch();
  const [currIdeas, setIdeas] = useState([]);
  useEffect(() => {
    dispatch(getCurrProfile());
    dispatch(getAllIdeas());
    // dispatch(getIdeaBatch(1));
  }, [dispatch]);
  useEffect(() => {
    return () => {
      dispatch({ type: RESET_LOADING });
    };
  }, []);
  const auth = useSelector(state => state.auth);
  const ideas = useSelector(state => state.ideas);
  const [homeIndex, setHomeIndex] = useState(0);
  if (ideas.loading) {
    return <Spinner />;
  }
  return (
    <div>
      <Banner color={auth.isAuthenticated ? 'blue' : 'pink'} />
      <CatBar page='home' homeIndex={homeIndex} setHomeIndex={setHomeIndex} />
      {homeIndex === 0 ? (
        <IdeaList ideas={ideas.ideas} />
      ) : (
        mainCategories.slice(1).map((category, index) => {
          return (
            homeIndex === index + 1 && (
              <IdeaList
                ideas={ideas.ideas.filter(idea => idea.category === category)}
              />
            )
          );
        })
      )}
    </div>
  );
};
