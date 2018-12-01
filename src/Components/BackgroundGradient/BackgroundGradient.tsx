import * as React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { themeSchema } from '../../Core/ThemeSchema/themeSchema';

const styles = StyleSheet.create({
	linearGradient: {
		flex: 1,
	}
});

export type ColorTheme = 'blue' | 'orange' | 'red' | 'black';

export interface BackgroundGradientProps {
	theme: ColorTheme;
	customStyle?: StyleProp<ViewStyle>;
}

export class BackgroundGradient extends React.Component<BackgroundGradientProps> {
	public render() {
		return (
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				colors={[themeSchema.linearGradient[this.props.theme].fromColor, themeSchema.linearGradient[this.props.theme].midColor, themeSchema.linearGradient[this.props.theme].toColor]}
				style={(this.props.customStyle) ? this.props.customStyle : styles.linearGradient}
			>
				{this.props.children}
			</LinearGradient>
		);
	}
}
