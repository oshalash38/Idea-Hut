import React, { Fragment } from 'react';
import testAvatar from '../../img/undraw_male_avatar_323b.svg';
import Moment from 'react-moment';
import { useHistory, Link } from 'react-router-dom';

export const IdeaCard = props => {
  const history = useHistory();
  const handleAvatarClick = e => {
    history.push();
  };
  let b64 = null;
  let mimeType = null;
  if (props.profilePicture) {
    const buffer = props.profilePicture;
    b64 = new Buffer(buffer).toString('base64');
    mimeType = 'image/jpeg';
  }

  return (
    <Fragment>
      <div className='media'>
        <Link to={`/profile/${props.id}`}>
          <img
            onClick={handleAvatarClick}
            class='tiny-avatar mr-3'
            src={
              mimeType && b64 ? `data:${mimeType};base64,${b64}` : testAvatar
            }
            alt='...'
          />
        </Link>
        <div class='media-body'>
          <div class='card'>
            <div class='card-header'>{props.username} commented</div>
            <div class='card-body'>
              <div
                dangerouslySetInnerHTML={{
                  __html: props.text
                }}
              />
            </div>
            <div class='card-footer text-muted'>
              on <Moment format='LLL'>{props.date}</Moment>
            </div>
          </div>
          <div class='vertical-line'></div>
        </div>
      </div>
    </Fragment>
  );
};
