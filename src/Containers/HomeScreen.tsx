import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { createBLEManager, exploreDevices } from '../Core/Bluetooth/createBLEManager';

const homeScreenStyles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})

export class HomeScreen extends React.Component {
	public async componentDidMount() {
		await createBLEManager();
		const peripheral = await exploreDevices();
		console.warn(peripheral);
	}
	public render() {
		return (
			<View style={homeScreenStyles.wrapper}>
				<Text>Main screen</Text>
			</View>
		)
	}
}
