import React from 'react';
import { useHistory, Link } from 'react-router-dom';

export const IdeaList = props => {
  const history = useHistory();
  return (
    <div className='p-5 center'>
      <div className='card-columns'>
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

        {/* <div
          className='card text-white mb-3'
          style={{ backgroundColor: '#c06c84', maxWidth: '18rem' }}
        >
          <div className='card-header'>COVID-19 Analysis</div>
          <div className='card-body'>
            <h5 className='card-title'>Dark card title</h5>
            <p className='card-text'>
              An analysis to covid-19 cases and upcoming projections.
            </p>
          </div>
        </div>
        <div
          className='card text-white mb-3'
          style={{ backgroundColor: '#6c5b7b', maxWidth: '18rem' }}
        >
          <div className='card-header'>COVID-19 Analysis</div>
          <div className='card-body'>
            <h5 className='card-title'>Dark card title</h5>
            <p className='card-text'>An analysis to covid-19 case</p>
          </div>
        </div>

        <div
          className='card text-white mb-3'
          style={{ backgroundColor: '#355c7d', maxWidth: '18rem' }}
        >
          <div className='card-header'>COVID-19 Analysis</div>
          <div className='card-body'>
            <h5 className='card-title'>Dark card title</h5>
            <p className='card-text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum..
            </p>
          </div>
        </div>
        <div
          className='card text-white mb-3'
          style={{ backgroundColor: '#f67280', maxWidth: '18rem' }}
        >
          <div className='card-header'>COVID-19 Analysis</div>
          <div className='card-body'>
            <h5 className='card-title'>Dark card title</h5>
            <p className='card-text'>
              An analysis to covid-19 cases and upcoming projections.
            </p>
          </div>
        </div>

        <div
          className='card text-white mb-3'
          style={{ backgroundColor: '#c06c84', maxWidth: '18rem' }}
        >
          <div className='card-header'>COVID-19 Analysis</div>
          <div className='card-body'>
            <h5 className='card-title'>Dark card title</h5>
            <p className='card-text'>
              An analysis to covid-19 cases and upcoming projections.
            </p>
          </div>
        </div>
        <div
          className='card text-white mb-3'
          style={{ backgroundColor: '#6c5b7b', maxWidth: '18rem' }}
        >
          <div className='card-header'>COVID-19 Analysis</div>
          <div className='card-body'>
            <h5 className='card-title'>Dark card title</h5>
            <p className='card-text'>
              An analysis to covid-19 cases and upcoming projections.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};
