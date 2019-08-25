import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Calendar: CalendarScreen
});

export default createAppContainer(AppNavigator);
