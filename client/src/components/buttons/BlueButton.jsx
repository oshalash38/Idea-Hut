import React from 'react';

export const BlueButton = props => {
  return (
    <button type='submit' class='btn btn-blue float-right'>
      {props.text}
    </button>
  );
};
