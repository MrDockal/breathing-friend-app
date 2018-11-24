import * as React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { ColorTheme } from '../BackgroundGradient';
import { TextNormal } from '../Text/TextNormal';
import { themeSchema } from '../../Core/ThemeSchema/themeSchema';

const styles = StyleSheet.create({
	wrapper: {
		borderRadius: 40,
	},
	wrapperInner: {
		paddingVertical: 10,
		paddingHorizontal: 30,
		height: 80,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	optionBox: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	circle: {
		width: 20,
		height: 20,
		borderRadius: 20,
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
		marginLeft: 10,
	},
	circleSelected: {
		backgroundColor: 'white',
		shadowOffset: {
			width: 3,
			height: 3
		},
		shadowRadius: 5,
		shadowOpacity: 1,
		elevation: 10,
		shadowColor: 'white'
	},
	center: {
		justifyContent: 'center',
	},
	empty: {
		width: 50,
	}
});

export interface OwnProps {
	theme: ColorTheme;
	title: string;
	optionId: string;
	selected: boolean;
	onPress?: () => void;
}

export class ColoredSelectBox extends React.Component<OwnProps> {
	public render() {
		const themeColor = StyleSheet.create({
			wrapperColor: {
				backgroundColor: !this.props.selected ? themeSchema.button[this.props.theme].fontColor : 'transparent',
			}
		});
		return (
			<View style={[styles.wrapper, themeColor.wrapperColor]}>
				<TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .1)', true)} onPress={this.props.onPress}>
					<View style={styles.wrapperInner}>
						<View style={styles.optionBox}>
							<TextNormal>{this.props.optionId}</TextNormal>
							<View style={[styles.circle, this.props.selected && styles.circleSelected]} />
						</View>
						<TextNormal bold={true}>{this.props.title}</TextNormal>
						<View style={styles.empty} />
					</View>
				</TouchableNativeFeedback>
			</View>
		);
	}
}