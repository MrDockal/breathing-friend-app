import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

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
			<View style={deviceScreenStyles.wrapper}>
				<Text>Devices!!</Text>
			</View>
		)
	}
}
