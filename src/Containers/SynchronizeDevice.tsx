import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const syncrhonizeDeviceScreensStyles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})

export class SynchronizeDeviceScreen extends React.Component {
	public render() {
		return (
			<View style={syncrhonizeDeviceScreensStyles.wrapper}>
				<Text>Sync Device</Text>
			</View>
		)
	}
}
