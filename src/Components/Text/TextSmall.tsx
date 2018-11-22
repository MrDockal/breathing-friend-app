import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { themeSchema } from '../../Core/ThemeSchema/themeSchema';

const styles = StyleSheet.create({
	text: {
		color: themeSchema.color.fontColor,
		fontSize: themeSchema.fontSize.small,
		textAlign: 'center',
	},
	bold: {
		fontFamily: 'Tondo_Bold',
	},
	normal: {
		fontFamily: 'Tondo',
	},
	underline: {
		textDecorationLine: 'underline',
	}
});

export interface TextSmallProps {
	bold?: boolean;
	underline?: boolean;
}

export class TextSmall extends React.Component<TextSmallProps> {
	public render() {
		return (
			<Text style={[styles.text, this.props.bold ? styles.bold : styles.normal, this.props.underline && styles.underline]}>{this.props.children}</Text>
		)
	}
}
