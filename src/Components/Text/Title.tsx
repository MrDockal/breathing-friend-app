import * as React from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { themeSchema } from '../../Core/ThemeSchema/themeSchema';

const styles = StyleSheet.create({
	text: {
		color: themeSchema.color.fontColor,
		fontSize: themeSchema.fontSize.title,
		textAlign: 'center',
	},
	bold: {
		fontFamily: 'Tondo_Bold',
	},
	normal: {
		fontFamily: 'Tondo',
	}
});

export interface TitleProps {
	bold?: boolean;
	style?: StyleProp<TextStyle>;
}

export class Title extends React.Component<TitleProps> {
	public render() {
		return (
			<Text style={[styles.text, this.props.bold ? styles.bold : styles.normal, this.props.style]}>{this.props.children}</Text>
		);
	}
}
