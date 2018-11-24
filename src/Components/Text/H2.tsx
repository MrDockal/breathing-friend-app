import * as React from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { themeSchema } from '../../Core/ThemeSchema/themeSchema';

const styles = StyleSheet.create({
	text: {
		color: themeSchema.color.fontColor,
		fontSize: themeSchema.fontSize.h2,
		textAlign: 'center',
	},
	bold: {
		fontFamily: 'Tondo_Bold',
	},
	normal: {
		fontFamily: 'Tondo',
	}
});

export interface H2Props {
	bold?: boolean;
	style?: StyleProp<TextStyle>;
}

export class H2 extends React.Component<H2Props> {
	public render() {
		return (
			<Text style={[styles.text, this.props.bold ? styles.bold : styles.normal, this.props.style]}>{this.props.children}</Text>
		);
	}
}
