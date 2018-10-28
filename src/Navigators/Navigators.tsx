import * as React from 'react';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, createNavigationContainer } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// TabNavigation Screens
import { HomeScreen } from '../Containers/HomeScreen';
import { DeviceScreen } from '../Containers/DeviceScreen';
import { SettingsScreen } from '../Containers/SettingsScreen';
import { StatsScreen } from '../Containers/StatsScreen';

// SwitchNavigation Screen
import { SplashScreen } from '../Containers/SplashScreen';
import { SynchronizeDeviceScreen } from '../Containers/SynchronizeDevice';

const TabNavigation = createBottomTabNavigator(
	{
		Home: HomeScreen,
		Stats: StatsScreen,
		Settings: SettingsScreen,
		Devices: DeviceScreen,
	},
	{
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }: {focused: boolean, tintColor: string}) => {
				const { routeName } = navigation.state;
				let iconName;
				if (routeName === 'Home') {
					iconName = `home`;
				} else if (routeName === 'Stats') {
					iconName = `show-chart`;
				} else if (routeName === 'Settings') {
					iconName = `settings`;
				} else if (routeName === 'Devices') {
					iconName = `favorite`
				}

				// You can return any component that you like here! We usually use an
				// icon component from react-native-vector-icons
				//return <MaterialIcons
				//return <MaterialIcons name={ iconName } size = { horizontal? 20 : 25} color = { tintColor } />;
			return <MaterialIcons name={iconName} size={24} style={{ color: tintColor }} />
			},
		}),
		tabBarOptions: {
			activeTintColor: 'tomato',
			inactiveTintColor: 'gray',
		},
		animationEnabled: true,
	}
);

const SwitchNavigation = createSwitchNavigator(
	{
		Main: {
			screen: TabNavigation
		},
		SyncDevice: {
			screen: SynchronizeDeviceScreen,
		},
		SplashScreen: {
			screen: SplashScreen,
		}
	},
	{
		initialRouteName: 'SplashScreen',
		resetOnBlur: true,
		backBehavior: 'none',
	}
);

export default createNavigationContainer(SwitchNavigation);
