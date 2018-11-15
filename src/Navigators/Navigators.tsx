import * as React from 'react';
import { createBottomTabNavigator, createStackNavigator, createNavigationContainer, createSwitchNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// TabNavigation Screens
import { HomeScreen } from '../Containers/HomeScreen';
import { SettingsScreen } from '../Containers/SettingsScreen';
import { StatsScreen } from '../Containers/StatsScreen';

// SwitchNavigation Screen
import { SplashScreen } from '../Containers/SplashScreen';
import { SynchronizeDeviceScreen } from '../Containers/SynchronizeDeviceScreen';
import { SettingsAboutApp } from '../Components/SettingsAboutApp';
import { SeetingsReportBug } from '../Components/SettingsReportBug';
import { SignpostScreen } from '../Containers/SignpostScreen';
import { RenameDeviceScreen } from '../Containers/RenameDeviceScreen';

export const routeNames = {
	HomeTab: 'HomeTab',
	StatsTab: 'StatsTab',
	SettingsTab: 'SettingsTab',
	About: 'About',
	ReportBug: 'ReportBug',
	MainApp: 'MainApp',
	SplashScreen: 'SplashScreen',
	SignpostScreen: 'SignpostScreen',
	BluetoothSearchDevices: 'BluetoothSearchDevices',
	RenameDeviceScreen: 'RenameDeviceScreen',
	App: 'App',
}

const SettingsStackNavigation = createStackNavigator(
	{
		[routeNames.SettingsTab]: {
			screen: SettingsScreen,
			navigationOptions: {
				header: null,
			},
		},
		[routeNames.About]: {
			screen: SettingsAboutApp,
		},
		[routeNames.ReportBug]: {
			screen: SeetingsReportBug,
		}
	}, {
		initialRouteName: routeNames.SettingsTab,
		headerMode: 'screen',
	}
);

const TabNavigation = createBottomTabNavigator(
	{
		[routeNames.HomeTab]: {
			screen: HomeScreen,
			navigationOptions: () => ({
				title: `Home`,
			}),
		},
		[routeNames.StatsTab]: {
			screen: StatsScreen,
			navigationOptions: () => ({
				title: `Stats`,
			}),
		},
		[routeNames.SettingsTab]: {
			screen: SettingsStackNavigation,
			navigationOptions: () => ({
				title: `Settings`,
			}),
		},
	},
	{
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }: {focused: boolean, tintColor: string}) => {
				const { routeName } = navigation.state;
				let iconName = 'N/A';
				if (routeName === routeNames.HomeTab) {
					iconName = `home`;
				} else if (routeName === routeNames.StatsTab) {
					iconName = `show-chart`;
				} else if (routeName === routeNames.SettingsTab) {
					iconName = `settings`;
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

const MainAppNavigation = createStackNavigator(
	{
		[routeNames.MainApp]: {
			screen: TabNavigation,
			navigationOptions: {
				header: null,
			},
		},
		[routeNames.BluetoothSearchDevices]: {
			screen: SynchronizeDeviceScreen,
		},
		[routeNames.RenameDeviceScreen]: {
			screen: RenameDeviceScreen,
		},
		[routeNames.SignpostScreen]: {
			screen: SignpostScreen,
			navigationOptions: {
				header: null,
			},
		}
	},
	{
		initialRouteName: routeNames.SignpostScreen,
	}
);

const App = createSwitchNavigator(
	{
		[routeNames.SplashScreen]: {
			screen: SplashScreen,
		},
		[routeNames.App]: {
			screen: MainAppNavigation,
		}
	},
	{
		initialRouteName: routeNames.SplashScreen,
		resetOnBlur: true,
		backBehavior: 'none',
	}
)

export default createNavigationContainer(App);