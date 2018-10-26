import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const settingsScreenStyles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})

export class SettingsScreen extends React.Component {
	public render() {
		return (
			<View style={settingsScreenStyles.wrapper}>
				<Text>Settings!!</Text>
			</View>
		)
	}
}
