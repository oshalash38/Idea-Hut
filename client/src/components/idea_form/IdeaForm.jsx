import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { BlueButton } from '../buttons/BlueButton';
import { useDispatch, useSelector } from 'react-redux';
import { composeIdea } from '../../actions/ideas';
import { useHistory } from 'react-router-dom';
import { Spinner } from '../layout/Spinner';
import { Alert } from '../layout/Alert';
import { CLEAR_CURR_IDEA } from '../../actions/types';

export const IdeaForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const ideas = useSelector(state => state.ideas);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    detailedDescription: '',
    category: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = e => {
    if (e.target) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, detailedDescription: e });
    }
  };

  // useEffect(() => {
  //   dispatch({ type: CLEAR_CURR_IDEA });
  // }, []);
  useEffect(() => {
    if (ideas.currIdea) {
      history.push(`/ideas/${ideas.currIdea._id}`);
    }
  }, [ideas.currIdea, history]);

  useEffect(() => {
    if (ideas.errors) {
      setSubmitted(false);
      console.log('fi errors');
    }
  }, [ideas.errors]);

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(composeIdea(formData));
  };

  return submitted ? (
    <Spinner />
  ) : (
    <div className='p-3'>
      <h1 className='minor-heading'>Compose a new idea</h1>
      <Alert />
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='ideaTitle'>Title</label>
          <input
            name='title'
            class='form-control'
            id='ideaTitle'
            type='text'
            onChange={handleChange}
            value={formData.title}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='shortDescription'>Short Description</label>
          <input
            class='form-control'
            id='shortDescription'
            type='text'
            name='shortDescription'
            onChange={handleChange}
            value={formData.shortDescription}
          />
          <small class='form-text text-muted'>Maximum 100 words</small>
        </div>
        <div className='form-group'>
          <label htmlFor='detailedDescription'>Detailed Description</label>
          {/* <div
            ref={ref}
            value={formData.detailedDescription}
            name='detailedDescription'
            id='editor'
          ></div> */}
          <ReactQuill
            value={formData.detailedDescription}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='ideaCategory'>Category</label>
          <select
            value={formData.category}
            onChange={handleChange}
            class='form-control'
            name='category'
            id='ideaCategory'
          >
            <option value='0'>Select Category</option>
            <option value='Mobile App'>Mobile App</option>
            <option value='Web App'>Web App</option>
          </select>
        </div>
        <BlueButton text='Submit Idea' />
      </form>
    </div>
  );
};
