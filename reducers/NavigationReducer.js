import { StackNavigator } from 'react-navigation';
import MainNavigator from '../components/navigation/MainNavigator';

const initialState = {
  index: 0,
  routes: [
    { key: 'Foo', routeName: 'Feed' },
  ],
};

export default function NavigationReducer(state = initialState, action = {}) {
  // console.log('reducer call', action.type);
  switch (action.type) {
    default:
      return MainNavigator.router.getStateForAction(action, state);
  }
}
