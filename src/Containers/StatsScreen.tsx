import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const statsScreensStyles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})

export class StatsScreen extends React.Component {
	public render() {
		return (
			<View style={statsScreensStyles.wrapper}>
				<Text>Stats</Text>
			</View>
		)
	}
}
