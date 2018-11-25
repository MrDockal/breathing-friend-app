import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { themeSchema } from '../../Core/ThemeSchema/themeSchema';
import { ColorTheme } from '../BackgroundGradient/BackgroundGradient';

const styles = StyleSheet.create({
	hr: {
		borderBottomWidth: 1
	},
});

export interface BreathingListItemProps {
	theme: ColorTheme;
}

export class Hr extends React.Component<BreathingListItemProps, {}> {
	public render() {
		return (
			<View style={[styles.hr, { borderBottomColor: themeSchema.button[this.props.theme].fontColor }]} />
		);
	}
}
