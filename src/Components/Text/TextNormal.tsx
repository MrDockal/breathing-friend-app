import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { themeSchema } from '../../Core/ThemeSchema/themeSchema';

const styles = StyleSheet.create({
	text: {
		color: themeSchema.color.fontColor,
		fontSize: themeSchema.fontSize.normal,
		textAlign: 'center',
	}
});


export class TextNormal extends React.Component {
	public render() {
		return (
			<Text style={styles.text}>{this.props.children}</Text>
		)
	}
}
