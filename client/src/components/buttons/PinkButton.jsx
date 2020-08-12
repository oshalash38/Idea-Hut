import React from 'react';

export const PinkButton = props => {
  return (
    <button
      onClick={props.onClick}
      type={props.submit && 'submit'}
      class='btn btn-pink'
      style={props.navBtn && { marginTop: '7px' }}
    >
      {props.text}
    </button>
  );
};
