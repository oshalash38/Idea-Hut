import React, { Fragment } from 'react';
import { useState } from 'react';
import { BlueButton } from '../buttons/BlueButton';
import { signup } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { fireAlert } from '../../actions/alert';
import { Alert } from '../layout/Alert';

export const Signup = () => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  // Handling first Step
  const [formData1, setFormData1] = useState({
    email: '',
    password1: '',
    password2: ''
  });
  const handleChange1 = e => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
  };
  const handleFirstStep = e => {
    e.preventDefault();
    if (formData1.password1 === formData1.password2) {
      dispatch(
        signup({ email: formData1.email, password: formData1.password1 })
      );
    } else {
      dispatch(fireAlert('danger', 'Passwords do not match.'));
    }
    if (auth.isAuthenticated) {
      setStep(2);
    }
  };

  // Handling second step
  const [formData2, setFormData2] = useState({
    username: '',
    profilePicture: '',
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
  const handleSecondStep = e => {
    e.preventDefault();
    console.log(formData2);
  };
  return (
    <div class='row'>
      <div class='col-6 left-auth'></div>
      <div class='col-6' style={{ padding: '48px 48px 0 48px' }}>
        <a class='navbar-brand' href='#'>
          Idea Hut
        </a>
        {step === 1 ? (
          <Fragment>
            <h2 class='minor-heading'>Create your account</h2>
            <Alert />
            <form onSubmit={handleFirstStep}>
              <div class='form-group'>
                <label for='InputEmail1'>Email Address</label>
                <input
                  name='email'
                  type='email'
                  class='form-control'
                  id='InputEmail1'
                  aria-describedby='emailHelp'
                  onChange={handleChange1}
                  required
                />
                <small id='emailHelp' class='form-text text-muted'>
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div class='form-group'>
                <label for='InputPassword1'>Password</label>
                <input
                  name='password1'
                  type='password'
                  class='form-control'
                  id='InputPassword1'
                  onChange={handleChange1}
                  required
                />
                <small id='passwordHelp' class='form-text text-muted'>
                  Must be at least 6 characters.
                </small>
              </div>
              <div class='form-group'>
                <label for='InputPassword2'>Re-enter Password</label>
                <input
                  name='password2'
                  type='password'
                  class='form-control'
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
            <h2 class='minor-heading'>Polish up your profile</h2>
            <form onSubmit={handleSecondStep}>
              <div class='form-group'>
                <label for='InputUsername'>Username</label>
                <input
                  name='username'
                  type='text'
                  class='form-control'
                  id='InputUsername'
                  onChange={handleChange2}
                  required
                />
              </div>
              <div class='form-group'>
                <label for='ProfilePicture'>Profile Picture</label>
                <div>
                  <input
                    name='profilePicture'
                    type='file'
                    id='ProfilePicture'
                    accept='image/*'
                    onChange={handleChange2}
                  />
                </div>
              </div>
              <div class='form-group'>
                <label for='Bio'>Bio</label>
                <textarea
                  name='bio'
                  class='form-control comment-textarea'
                  id='Bio'
                  rows='4'
                  cols='50'
                  onChange={handleChange2}
                ></textarea>
              </div>
              <div class='input-group'>
                <div class='input-group-prepend'>
                  <div class='input-group-text'>
                    <i class='fas fa-link'></i>
                  </div>
                </div>
                <input
                  name='website'
                  type='text'
                  class='form-control'
                  id='Website'
                  placeholder='Website'
                  onChange={handleChange2}
                />
              </div>
              <div class='input-group'>
                <div class='input-group-prepend'>
                  <div class='input-group-text'>
                    <i class='fab fa-github'></i>
                  </div>
                </div>
                <input
                  name='github'
                  type='text'
                  class='form-control'
                  id='Github'
                  placeholder='Github'
                  onChange={handleChange2}
                />
              </div>
              <div class='input-group'>
                <div class='input-group-prepend'>
                  <div class='input-group-text'>
                    <i class='fab fa-facebook'></i>
                  </div>
                </div>
                <input
                  name='facebook'
                  type='text'
                  class='form-control'
                  id='Facebook'
                  placeholder='Facebook'
                  onChange={handleChange2}
                />
              </div>
              <div class='input-group'>
                <div class='input-group-prepend'>
                  <div class='input-group-text'>
                    <i class='fab fa-twitter'></i>
                  </div>
                </div>
                <input
                  name='twitter'
                  type='text'
                  class='form-control'
                  id='Twitter'
                  placeholder='Twitter'
                  onChange={handleChange2}
                />
              </div>
              <div class='input-group'>
                <div class='input-group-prepend'>
                  <div class='input-group-text'>
                    <i class='fab fa-youtube'></i>
                  </div>
                </div>
                <input
                  name='youtube'
                  type='text'
                  class='form-control'
                  id='Youtube'
                  placeholder='Youtube'
                  onChange={handleChange2}
                />
              </div>
              <div class='input-group'>
                <div class='input-group-prepend'>
                  <div class='input-group-text'>
                    <i class='fab fa-linkedin'></i>
                  </div>
                </div>
                <input
                  name='linkedin'
                  type='text'
                  class='form-control'
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
