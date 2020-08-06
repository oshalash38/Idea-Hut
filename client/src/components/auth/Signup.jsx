import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { BlueButton } from '../buttons/BlueButton';
import { signup } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { fireAlert } from '../../actions/alert';
import { Alert } from '../layout/Alert';
import { createOrUpdateProfile } from '../../actions/profile';
import { useHistory } from 'react-router-dom';

export const Signup = () => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const history = useHistory();

  // Handling first Step
  const [formData1, setFormData1] = useState({
    email: '',
    password1: '',
    password2: ''
  });
  const handleChange1 = e => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
  };
  const handleFirstStep = async e => {
    e.preventDefault();
    if (formData1.password1 === formData1.password2) {
      dispatch(
        signup({ email: formData1.email, password: formData1.password1 })
      );
    } else {
      dispatch(fireAlert('danger', 'Passwords do not match.'));
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      setStep(2);
    }
  });

  // Handling second step
  const [formData2, setFormData2] = useState({
    username: '',
    profilePicture: null,
    bio: '',
    website: '',
    github: '',
    facebook: '',
    twitter: '',
    youtube: '',
    linkedin: ''
  });
  const handleChange2 = e => {
    setFormData2({ ...formData2, [e.target.name]: e.target.value });
  };
  const handleChangeImage = e => {
    setFormData2({ ...formData2, [e.target.name]: e.target.files[0] });
  };
  const handleSecondStep = e => {
    e.preventDefault();
    dispatch(createOrUpdateProfile(formData2));
    if (auth.isAuthenticated) {
      history.push('/');
    }
  };
  return (
    <div className='row'>
      <div className='col-6 left-auth'></div>
      <div className='col-6' style={{ padding: '48px 48px 0 48px' }}>
        <a className='navbar-brand' href='#'>
          Idea Hut
        </a>
        {step === 1 ? (
          <Fragment>
            <h2 className='minor-heading'>Create your account</h2>
            <Alert />
            <form onSubmit={handleFirstStep}>
              <div className='form-group'>
                <label htmlFor='InputEmail1'>Email Address</label>
                <input
                  name='email'
                  type='email'
                  className='form-control'
                  id='InputEmail1'
                  aria-describedby='emailHelp'
                  onChange={handleChange1}
                  required
                />
                <small id='emailHelp' className='form-text text-muted'>
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className='form-group'>
                <label htmlFor='InputPassword1'>Password</label>
                <input
                  name='password1'
                  type='password'
                  className='form-control'
                  id='InputPassword1'
                  onChange={handleChange1}
                  required
                />
                <small id='passwordHelp' className='form-text text-muted'>
                  Must be at least 6 characters.
                </small>
              </div>
              <div className='form-group'>
                <label htmlFor='InputPassword2'>Re-enter Password</label>
                <input
                  name='password2'
                  type='password'
                  className='form-control'
                  id='InputPassword2'
                  onChange={handleChange1}
                  required
                />
              </div>
              <BlueButton text='Sign up' />
            </form>
          </Fragment>
        ) : (
          <Fragment>
            <h2 className='minor-heading'>Polish up your profile</h2>
            <form onSubmit={handleSecondStep}>
              <div className='form-group'>
                <label htmlFor='InputUsername'>Username</label>
                <input
                  name='username'
                  type='text'
                  className='form-control'
                  id='InputUsername'
                  onChange={handleChange2}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='ProfilePicture'>Profile Picture</label>
                <div>
                  <input
                    name='profile_picture'
                    type='file'
                    id='ProfilePicture'
                    accept='image/*'
                    onChange={handleChangeImage}
                  />
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='Bio'>Bio</label>
                <textarea
                  name='bio'
                  className='form-control comment-textarea'
                  id='Bio'
                  rows='4'
                  cols='50'
                  onChange={handleChange2}
                ></textarea>
              </div>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <div className='input-group-text'>
                    <i class='fas fa-globe'></i>
                  </div>
                </div>
                <input
                  name='website'
                  type='text'
                  className='form-control'
                  id='Website'
                  placeholder='Website'
                  onChange={handleChange2}
                />
              </div>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <div className='input-group-text'>
                    <i className='fab fa-github'></i>
                  </div>
                </div>
                <input
                  name='github'
                  type='text'
                  className='form-control'
                  id='Github'
                  placeholder='Github'
                  onChange={handleChange2}
                />
              </div>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <div className='input-group-text'>
                    <i className='fab fa-facebook'></i>
                  </div>
                </div>
                <input
                  name='facebook'
                  type='text'
                  className='form-control'
                  id='Facebook'
                  placeholder='Facebook'
                  onChange={handleChange2}
                />
              </div>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <div className='input-group-text'>
                    <i className='fab fa-twitter'></i>
                  </div>
                </div>
                <input
                  name='twitter'
                  type='text'
                  className='form-control'
                  id='Twitter'
                  placeholder='Twitter'
                  onChange={handleChange2}
                />
              </div>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <div className='input-group-text'>
                    <i className='fab fa-youtube'></i>
                  </div>
                </div>
                <input
                  name='youtube'
                  type='text'
                  className='form-control'
                  id='Youtube'
                  placeholder='Youtube'
                  onChange={handleChange2}
                />
              </div>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <div className='input-group-text'>
                    <i className='fab fa-linkedin'></i>
                  </div>
                </div>
                <input
                  name='linkedin'
                  type='text'
                  className='form-control'
                  id='Linkedin'
                  placeholder='Linkedin'
                  onChange={handleChange2}
                />
              </div>
              <BlueButton text='Create profile' />
            </form>
          </Fragment>
        )}
      </div>
    </div>
  );
};
