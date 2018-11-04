import React from 'react';
import {ScrollView, Text, StyleSheet, Button} from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { routeNames } from '../Navigators/Navigators';

const settingsScreenStyles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})

export class SettingsScreen extends React.Component<NavigationInjectedProps> {
	public render() {
		return (
			<ScrollView contentContainerStyle={settingsScreenStyles.wrapper}>
				<Button 
					onPress={() => {
						this.props.navigation.navigate(routeNames.About)
					}}
					title='About'
				/>
				<Button 
					onPress={() => {
						this.props.navigation.navigate(routeNames.ReportBug)
					}}
					title='ReportBug'
				/>
				<Button 
					onPress={() => {
						this.props.navigation.navigate(routeNames.SignpostScreen)
					}}
					title='Switch devices'
				/>
				<Text>Settings!!</Text>
			</ScrollView>
		)
	}
}
