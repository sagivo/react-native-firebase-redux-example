import { StackNavigator } from 'react-navigation';
import {types} from '../actions/navigationActions';

const initialState = {
  mainNav: null,
};

export default function NavigationReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_MAIN_NAV:
      return { ...state, mainNav: action.payload }
    default:
      return state;
  }
}
