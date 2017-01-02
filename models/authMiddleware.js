
import {ensureLogin} from '../reducers/UserReducer';

export default function authMiddleware({ getState }) {
  return (next) => (action) => {
    ensureLogin(loggedIn => {
      if (loggedIn) next(action);
      else throw new Error('User not logged in!!');
    });
  }
}
