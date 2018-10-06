import React from 'react';
import { Image, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabNavigator, TabBarBottom, NavigationScreenOptions, NavigationProp, createDrawerNavigator, NavigationScreenProp, NavigationScreenProps } from 'react-navigation';

// const chartsIcon = require('./chats-icon.png');

const styles = StyleSheet.create({
	icon: {
		width: 24,
		height: 24,
	},
})

class HomeScreen extends React.Component<NavigationScreenProps<any>> {
	static navigationOptions: NavigationScreenOptions = {
		drawerLabel: 'Home',
		drawerIcon: ({ tintColor }) => (
			<Icon name='chartsIcon' />
		)
	};

	public componentDidMount() {
		setInterval(() => {
			this.props.navigation.toggleDrawer();
		}, 5000);
	}

	public render() {
		return (
			<Button
				onPress={() => this.props.navigation.navigate('Notifications')}
				title="Go to notifications"
			/>
		);
	}
}

export const DrawerNavigation = createDrawerNavigator({
	Home: {
		screen: HomeScreen,
	},
});
