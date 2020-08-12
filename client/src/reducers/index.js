import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import profile from './profile';
import ideas from './ideas';

export default combineReducers({ auth, alert, profile, ideas });
