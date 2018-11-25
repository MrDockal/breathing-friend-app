import * as React from 'react';
import { StyleSheet, ScrollView, StyleProp } from 'react-native';

const styles = StyleSheet.create({
	wrapper: {
		paddingTop: 80,
		flexGrow: 1,
	}
});

export interface HeaderlessViewProps {
	contentContainerStyle?: StyleProp<any>;
}

export class HeaderlessView extends React.Component<HeaderlessViewProps> {
	public render() {
		return (
			<ScrollView
				contentContainerStyle={[styles.wrapper, this.props.contentContainerStyle]}
			>
				{
					this.props.children
				}
			</ScrollView>
		)
	}
}
