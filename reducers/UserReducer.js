import {types} from '../actions/userActions';
import {AsyncStorage} from 'react-native';

const USER_STORAGE_KEY = 'USER_STORAGE_KEY';

const initialState = {
  id: null,
  name: 'Sagiv Ofek',
  email: null,
  gender: null,
  fb: null,
  location: null,
  languages: null,
  refreshing: false,
  loaction: { lat: null, lan: null },
  rating: null,
  contacts: 0,
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.REFRESHING_USER:
      return { ...state, refreshing: true };
    case types.ON_USER_DATA:
      return { ...state, ...action.payload, refreshing: false };
    case types.LOGOUT:
      logout();
      return { ...state, id: null };
    default: return state;
  }
}

export async function ensureLogin(cb) {
  // saveUserId('sagiv')
  if (initialState.id) cb(true);
  else {
    const localUserId = await AsyncStorage.getItem(USER_STORAGE_KEY)
    if (!localUserId) {
      cb(false);
      return;
    }
    initialState.id  = localUserId;
    cb(true);
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
  console.log('loging out');
  await AsyncStorage.removeItem(USER_STORAGE_KEY);
}

async function setUserLocation() {
  try {
    let res = await fetch('https://api.ipify.org');
    const ip = await res.text();

    res = await fetch(`https://ipapi.co/${ip}/json`);
    const location = await res.json();
  } catch(error) {
    console.error(error);
  }
}