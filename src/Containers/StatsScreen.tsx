import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';

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
			<ScrollView contentContainerStyle={statsScreensStyles.wrapper}>
				<Text>Stats</Text>
			</ScrollView>
		)
	}
}
