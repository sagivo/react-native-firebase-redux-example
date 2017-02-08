import { StackNavigator } from 'react-navigation';
import MainNavigator from '../components/navigation/MainNavigator';

const initialState = {
  index: 0,
  routes: [
    { key: 'Home', routeName: 'Home' },
  ],
};

export default function NavigationReducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return MainNavigator.router.getStateForAction(action, state);
  }
}
