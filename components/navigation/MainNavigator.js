import { StackNavigator } from 'react-navigation';

import MainContainer from '../../containers/MainContainer';
import ComposeContainer from '../../containers/ComposeContainer';
import FeedContainer from '../../containers/FeedContainer';
import HistoryContainer from '../../containers/HistoryContainer';
import CallContainer from '../../containers/CallContainer';


const nav = StackNavigator({
  Feed: { screen: FeedContainer },
  Compose: { screen: ComposeContainer },
  History: { screen: HistoryContainer },
  Call: { screen: CallContainer },
}, {
  headerMode: 'screen',
});

export default nav;