import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { createBLEManager, exploreDevices } from '../Core/Bluetooth/createBLEManager';
import { themeSchema } from '../Core/ThemeSchema/themeSchema';

const homeScreenStyles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: themeSchema.color.backgroundColor,
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
				<Text style={{color: themeSchema.color.fontColor, fontSize: themeSchema.fontSize.h1}}>Lorem ipsum dole more</Text>
				<Text style={{color: themeSchema.color.fontColor, fontSize: themeSchema.fontSize.h2}}>Lorem ipsum dole more</Text>
				<Text style={{color: themeSchema.color.fontColor, fontSize: themeSchema.fontSize.normal}}>Lorem ipsum dole more</Text>
			</View>
		)
	}
}
