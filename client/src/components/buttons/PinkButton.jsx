import React from 'react';

export const PinkButton = props => {
  return (
    <button type='submit' class='btn btn-pink'>
      {props.text}
    </button>
  );
};
