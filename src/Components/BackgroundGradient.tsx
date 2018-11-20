import * as React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { themeSchema } from '../Core/ThemeSchema/themeSchema';

const styles = StyleSheet.create({
	linearGradient: {
		flex: 1,
	}
});

export class BackgroundGradient extends React.Component {
	public render() {
		return (
			<LinearGradient
				start={{x: 1, y: 0}}
				end={{x: 1, y: 0}}
				colors={[themeSchema.linearGradient.fromColor, themeSchema.linearGradient.toColor]}
				style={styles.linearGradient}
			>
				{ this.props.children }
			</LinearGradient>
		);
	}
}
