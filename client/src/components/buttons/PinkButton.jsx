import React from 'react';

export const PinkButton = props => {
  return (
    <button type='submit' class='btn btn-blue'>
      {props.text}
    </button>
  );
};
