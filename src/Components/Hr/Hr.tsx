import * as React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	hr: {
		borderBottomWidth: 2
	},
});

export type BreathingListItemThemeColor = 'black' | 'white';

export interface BreathingListItemProps {
	theme: BreathingListItemThemeColor;
}

export class Hr extends React.Component<BreathingListItemProps, {}> {
	public render() {
		const borderBottomColor = (() => {
			switch (this.props.theme) {
				case 'black':
					return 'rgba(0, 0, 0, 0.1)'
				case 'white':
					return 'rgba(255, 255, 255, 0.2)';
			}
		})();
		const propsStyles = StyleSheet.create({
			bottomColor: {
				borderBottomColor,
			}
		});
		return (
			<View style={[styles.hr, propsStyles.bottomColor]} />
		);
	}
}
