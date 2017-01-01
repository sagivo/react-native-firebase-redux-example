import {AsyncStorage} from 'react-native';
import {getUserId, setUserId} from '../reducers/UserReducer';

const USER_STORAGE_KEY = 'USER_STORAGE_KEY';

export default function authMiddleware({ getState }) {
  return (next) => (action) => {
    saveUserId('sagiv');
    const userId = getState().UserReducer.id;

    if (!userId) {
      console.log('geting from local storage');
      try {
        AsyncStorage.getItem(USER_STORAGE_KEY).then(localUserId => {
          console.log('user from storage', localUserId);
          if (!localUserId) {
            return false;
          }
          setUserId(localUserId);
          next(action);
        });
      } catch (e) {
        console.error('Failed to load name.')
      }
    } else next(action);
  }
}




async function saveUserId(userId) {
  try {
    await AsyncStorage.setItem(USER_STORAGE_KEY, userId);
    return true;
  } catch (e) {
    console.error('Failed to save name.');
    return false;
  }
}

export async function logout() {
  console.log('?????');
  // await AsyncStorage.removeItem(USER_STORAGE_KEY);
}