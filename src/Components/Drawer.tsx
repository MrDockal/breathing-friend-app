import React from 'react';
import { createDrawerNavigator, createStackNavigator, NavigationScreenOptions } from "react-navigation";
import { View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class MyDeviceScreen extends React.Component {
	static navigationOptions: NavigationScreenOptions = {
		drawerLabel: 'Drafts',
		drawerIcon: ({ tintColor }) => (
			<MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
		),
	}
	public render() {
		return (
			<View>
				<Text>Ahoj</Text>
			</View>
		);
	}
}

const JednaScreen = () => {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Jedna screen</Text>
		</View>
	);
}

const DvaScreen = () => {
	return (
		<View>
			<Text>Dva screen</Text>
		</View>
	);
}

const HomeStack = createStackNavigator({
	Jedna: JednaScreen,
	Dva: DvaScreen
}, {
		initialRouteName: 'Jedna',
	});

(HomeStack.navigationOptions as NavigationScreenOptions) = {
	drawerLabel: 'Inbox',
	title: 'a',
	drawerIcon: ({ tintColor }) => (
		<MaterialIcons
			name="move-to-inbox"
			size={24}
			style={{ color: tintColor }}
		/>
	),
};

export const Drawer = createDrawerNavigator({
	Home: {
		screen: HomeStack,
	},
	Device: {
		screen: MyDeviceScreen,
	},
})