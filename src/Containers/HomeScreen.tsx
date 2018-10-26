import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import db from '../Services/db';
import { createDbServiceContainer } from '../Services/createDbServiceContainer';
import { BreathingMode } from '../Models/BreathingMode';

const homeScreenStyles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})

export class HomeScreen extends React.Component {

	public componentDidMount() {
		const services = createDbServiceContainer(db);
		services.getAllBreathingModes().then((modes: BreathingMode[]) => {
			console.warn(JSON.stringify(modes));
		}).catch((e: Error) => {
			console.warn(e);
		})
	}

	public render() {
		return (
			<View style={homeScreenStyles.wrapper}>
				<Text>Main screen</Text>
			</View>
		)
	}
}
