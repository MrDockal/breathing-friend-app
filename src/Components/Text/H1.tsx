import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { themeSchema } from '../../Core/ThemeSchema/themeSchema';

const styles = StyleSheet.create({
	text: {
		color: themeSchema.color.fontColor,
		fontSize: themeSchema.fontSize.h1,
		textAlign: 'center',
	},
	bold: {
		fontFamily: 'Tondo_Bold',
	},
	normal: {
		fontFamily: 'Tondo',
	}
});

export interface H1Props {
	bold?: boolean;
}

export class H1 extends React.Component<H1Props> {
	public render() {
		return (
			<Text style={[styles.text, this.props.bold ? styles.bold : styles.normal]}>{this.props.children}</Text>
		)
	}
}
