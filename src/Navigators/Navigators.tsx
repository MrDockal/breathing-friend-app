import * as React from 'react';
import { createBottomTabNavigator, createStackNavigator, createNavigationContainer, createSwitchNavigator, NavigationScreenConfig } from 'react-navigation';
import { Icon } from 'react-native-elements'

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
import { BreathingModeDetailScreen } from '../Containers/BreathingModeDetailScreen';
import { SuccessDeviceScreen } from '../Containers/SuccessDeviceScreen';
import { themeSchema } from '../Core/ThemeSchema/themeSchema';

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
	BreathingModeDetail: 'BreathingModeDetail',
	SuccessDeviceScreen: 'SuccessDeviceScreen:',
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

const HomeScreenStackNavigation = createStackNavigator(
	{
		[routeNames.HomeTab]: {
			screen: HomeScreen,
			navigationOptions: {
				header: null,
			},
		},
		[routeNames.BreathingModeDetail]: {
			screen: BreathingModeDetailScreen,
		},
	}, {
		initialRouteName: routeNames.HomeTab,
		headerMode: 'screen',
	}
);

HomeScreenStackNavigation.navigationOptions = ({ navigation }: any) => {
	const { routeName } = navigation.state.routes[navigation.state.index];
	const tabBarVisible = !(routeName === routeNames.BreathingModeDetail);
	return {
		tabBarVisible,
	}
};

const TabNavigation = createBottomTabNavigator(
	{
		[routeNames.HomeTab]: {
			screen: HomeScreenStackNavigation,
			navigationOptions: () => ({
				title: `Domů`,
			}),
		},
		[routeNames.StatsTab]: {
			screen: StatsScreen,
			navigationOptions: () => ({
				title: `Analýza`,
			}),
		},
		[routeNames.SettingsTab]: {
			screen: SettingsStackNavigation,
			navigationOptions: () => ({
				title: `Nastavení`,
			}),
		},
	},
	{
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }: {focused: boolean, tintColor: string}) => {
				const { routeName } = navigation.state;
				let iconName = 'N/A';
				let type = '';
				if (routeName === routeNames.HomeTab) {
					iconName = `home`;
					type = 'feather'
				} else if (routeName === routeNames.StatsTab) {
					type = 'font-awesome'
					iconName = `bar-chart`;
				} else if (routeName === routeNames.SettingsTab) {
					iconName = `settings`;
				}

				// You can return any component that you like here! We usually use an
				// icon component from react-native-vector-icons
				//return <MaterialIcons
				//return <MaterialIcons name={ iconName } size = { horizontal? 20 : 25} color = { tintColor } />;
				return <Icon name={iconName} type={type} size={25} color={tintColor} />
			},
		}),
		tabBarOptions: {
			activeTintColor: 'tomato',
			inactiveTintColor: 'gray',
			labelStyle: {
				fontSize: themeSchema.fontSize.small,
				fontWeight: 'bold'
			},
			style: {
				height: themeSchema.bottomNavigation.panel.height
			}
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
		[routeNames.SuccessDeviceScreen]: {
			screen: SuccessDeviceScreen,
			navigationOptions: {
				header: null,
			},
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
