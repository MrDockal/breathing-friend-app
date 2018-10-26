import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const homeScreenStyles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})

export class HomeScreen extends React.Component {
	public render() {
		return (
			<View style={homeScreenStyles.wrapper}>
				<Text>Main screen</Text>
			</View>
		)
	}
}
