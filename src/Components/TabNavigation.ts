import { TabNavigator, TabBarBottom } from 'react-navigation';
import { HomeScreen } from '../Containers/HomeScreen';
import { DeviceScreen } from '../Containers/DeviceScreen';

export const TabNavigation = TabNavigator({
	Home: {screen: HomeScreen},
	Device: {screen: DeviceScreen}
}, {
	tabBarComponent: TabBarBottom,
	tabBarPosition: 'bottom',
	tabBarOptions: {
	  activeTintColor: 'tomato',
	  inactiveTintColor: 'gray',
	},
	animationEnabled: false,
	swipeEnabled: false,
});

