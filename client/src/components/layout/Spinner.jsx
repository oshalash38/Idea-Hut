import React from 'react';
import Loader from 'react-loader-spinner';

export const Spinner = () => {
  return (
    <div className='screen-center'>
      <Loader
        type='Rings'
        color='#00BFFF'
        height={100}
        width={100}
        timeout={5000} //3 secs
      />
    </div>
  );
};
