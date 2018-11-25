import * as React from 'react';
import { createBottomTabNavigator, createStackNavigator, createNavigationContainer, createSwitchNavigator, NavigationScreenConfig } from 'react-navigation';
import { Icon } from 'react-native-elements';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import { themeSchema } from '../Core/ThemeSchema/themeSchema';
import { SettingsScreen } from '../Containers/Settings/SettingsScreen';
import { HomeScreen } from '../Containers/Home/HomeScreen';
import { BreathingModeDetailScreen } from '../Containers/Home/BreathingModeDetailScreen';
import { SelectPositionScreen } from '../Containers/Home/SelectPositionScreen';
import { StatsScreen } from '../Containers/Stats/StatsScreen';
import { SynchronizeDeviceScreen } from '../Containers/OnBoarding/SynchronizeDeviceScreen';
import { RenameDeviceScreen } from '../Containers/OnBoarding/RenameDeviceScreen';
import { SuccessDeviceScreen } from '../Containers/OnBoarding/SuccessDeviceScreen';
import { SignpostScreen } from '../Containers/OnBoarding/SignpostScreen';
import { SplashScreen } from '../Containers/OnBoarding/SplashScreen';
import { SettingsRenameDeviceNameScreen } from '../Containers/Settings/SettingsRenameDeviceNameScreen';
import { SettingsAboutAppScreen } from '../Containers/Settings/SettingsAboutAppScreen';
import { SettingsReportBugScreen } from '../Containers/Settings/SettingsReportBugScreen';

export const routeNames = {
	HomeScreen: 'HomeScreen',
	StatsScreen: 'StatsScreen',
	SettingsScreen: 'SettingsScreen',
	SettingsAboutAppScreen: 'SettingsAboutAppScreen',
	SettingsReportBugScreen: 'SettingsReportBugScreen',
	MainApp: 'MainApp',
	SplashScreen: 'SplashScreen',
	SignpostScreen: 'SignpostScreen',
	SynchronizeDeviceScreen: 'SynchronizeDeviceScreen',
	RenameDeviceScreen: 'RenameDeviceScreen',
	App: 'App',
	BreathingModeDetailScreen: 'BreathingModeDetailScreen',
	SuccessDeviceScreen: 'SuccessDeviceScreen',
	SelectPositionScreen: 'SelectPositionScreen',
	SettingsRenameDeviceNameScreen: 'SettingsRenameDeviceNameScreen',
}

const SettingsStackNavigation = createStackNavigator(
	{
		[routeNames.SettingsScreen]: {
			screen: SettingsScreen,
			navigationOptions: {
				header: null,
			},
		},
		[routeNames.SettingsAboutAppScreen]: {
			screen: SettingsAboutAppScreen,
		},
		[routeNames.SettingsReportBugScreen]: {
			screen: SettingsReportBugScreen,
		},
		[routeNames.SettingsRenameDeviceNameScreen]: {
			screen: SettingsRenameDeviceNameScreen,
		},
	}, {
		initialRouteName: routeNames.SettingsScreen,
		headerMode: 'screen',
		transitionConfig: getSlideFromRightTransition,
	}
);
SettingsStackNavigation.navigationOptions = ({ navigation }: any) => {
	const { routeName } = navigation.state.routes[navigation.state.index];
	const tabBarVisible = !(
		(routeName === routeNames.SettingsRenameDeviceNameScreen) ||
		(routeName === routeNames.SettingsReportBugScreen) ||
		(routeName === routeNames.SettingsAboutAppScreen)
	);
	return {
		tabBarVisible,
	}
};

const HomeScreenStackNavigation = createStackNavigator(
	{
		[routeNames.HomeScreen]: {
			screen: HomeScreen,
			navigationOptions: {
				header: null,
			},
		},
		[routeNames.BreathingModeDetailScreen]: {
			screen: BreathingModeDetailScreen,
		},
		[routeNames.SelectPositionScreen]: {
			screen: SelectPositionScreen,
		}
	}, {
		initialRouteName: routeNames.HomeScreen,
		headerMode: 'screen',
		transitionConfig: getSlideFromRightTransition,
	}
);
HomeScreenStackNavigation.navigationOptions = ({ navigation }: any) => {
	const { routeName } = navigation.state.routes[navigation.state.index];
	const tabBarVisible = !(
		(routeName === routeNames.BreathingModeDetailScreen) ||
		(routeName === routeNames.SelectPositionScreen)
	);
	return {
		tabBarVisible,
	}
};

const MainApp = createBottomTabNavigator(
	{
		[routeNames.HomeScreen]: {
			screen: HomeScreenStackNavigation,
			navigationOptions: () => ({
				title: `Domů`,
			}),
		},
		[routeNames.StatsScreen]: {
			screen: StatsScreen,
			navigationOptions: () => ({
				title: `Analýza`,
			}),
		},
		[routeNames.SettingsScreen]: {
			screen: SettingsStackNavigation,
			navigationOptions: () => ({
				title: `Nastavení`,
			}),
		},
	},
	{
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }: { focused: boolean, tintColor: string }) => {
				const { routeName } = navigation.state;
				let iconName = 'N/A';
				let type = '';
				if (routeName === routeNames.HomeScreen) {
					iconName = `home`;
					type = 'feather'
				} else if (routeName === routeNames.StatsScreen) {
					type = 'font-awesome'
					iconName = `bar-chart`;
				} else if (routeName === routeNames.SettingsScreen) {
					iconName = `settings`;
				}

				// You can return any component that you like here! We usually use an
				// icon component from react-native-vector-icons
				//return <MaterialIcons
				//return <MaterialIcons name={ iconName } size = { horizontal? 20 : 25} color = { tintColor } />;
				return <Icon name={iconName} type={type} size={themeSchema.fontSize.normal} color={tintColor} />
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
			screen: MainApp,
			navigationOptions: {
				header: null,
			},
		},
		[routeNames.SynchronizeDeviceScreen]: {
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
		transitionConfig: getSlideFromRightTransition,
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
