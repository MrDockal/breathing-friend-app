import * as React from 'react';
import { View, Text, ActivityIndicator as ActivityIndicatorRN, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center'
	}
});

export class ActivityIndicator extends React.Component {
	public render() {
		return (
			<View style={styles.wrapper}>
				<ActivityIndicatorRN color={'white'} size={50} />
			</View>
		)
	}
}
