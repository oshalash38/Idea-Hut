import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import { getIdeaBatch } from '../../actions/ideas';

export const IdeaList = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [hasMore, setHasMore] = useState(true);
  const ideas = useSelector(state => state.ideas);
  const loadMore = page => {
    console.log('im called');

    dispatch(getIdeaBatch(page));
  };
  return (
    <div className='p-5 center'>
      <div className='card-columns'>
        {/* <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          loader={
            <div className='loader' key={0}>
              Loading ...
            </div>
          }
          hasMore={ideas.hasNextPage}
        > */}
        {props.ideas &&
          props.ideas.map((idea, index) => {
            let color;
            if ((index + 1) % 2 === 0) {
              if ((index + 1) % 4 === 0) {
                color = '#355c7d';
              } else {
                color = '#c06c84';
              }
            } else if ((index + 1) % 3 === 0) {
              color = '#6c5b7b';
            } else {
              color = '#f67280';
            }
            return (
              <div
                key={index}
                className='card text-white mb-3'
                style={{ backgroundColor: color, maxWidth: '18rem' }}
              >
                <h5 className='card-header'>{idea.title}</h5>
                <div className='card-body'>
                  <p className='card-text'>{idea.shortDescription}</p>
                  <Link to={`/ideas/${idea._id}`}>Explore</Link>
                </div>
              </div>
            );
          })}
        {/* </InfiniteScroll> */}
      </div>
    </div>
  );
};
