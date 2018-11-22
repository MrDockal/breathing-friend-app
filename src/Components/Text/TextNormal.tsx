import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { themeSchema } from '../../Core/ThemeSchema/themeSchema';

const styles = StyleSheet.create({
	text: {
		color: themeSchema.color.fontColor,
		fontSize: themeSchema.fontSize.normal,
		textAlign: 'center',
	},
	bold: {
		fontFamily: 'Tondo_Bold',
	},
	normal: {
		fontFamily: 'Tondo',
	}
});

export interface TextNormalProps {
	bold?: boolean;
}

export class TextNormal extends React.Component<TextNormalProps> {
	public render() {
		return (
			<Text style={[styles.text, this.props.bold ? styles.bold : styles.normal]}>{this.props.children}</Text>
		)
	}
}
