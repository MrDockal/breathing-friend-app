import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';

const deviceScreenStyles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})

export class DeviceScreen extends React.Component {
	public render() {
		return (
			<ScrollView contentContainerStyle={deviceScreenStyles.wrapper}>
				<Text>Devices!!</Text>
			</ScrollView>
		)
	}
}
