import * as React from 'react';
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native';
import { themeSchema } from '../../Core/ThemeSchema/themeSchema';
import { wait } from '../../Core/Helpers/wait';
import { ColorTheme } from '../BackgroundGradient/BackgroundGradient';

const styles = StyleSheet.create({
	parentWrapper: {
		borderRadius: 25,
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowRadius: 5,
		shadowOpacity: 1,
		elevation: 8,
	},
	disabledParentWrapper: {
		elevation: 0,
	},
	disabledWrapper: {
		backgroundColor: 'rgba(255, 255, 255, 0.3)'
	},
	wrapper: {
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 25,
		width: 290,
	},
	text: {
		textAlign: 'center',
		fontSize: themeSchema.fontSize.normal,
	}
});

export interface ButtonProps {
	title: string;
	onPress: () => void;
	disabled?: boolean;
	theme: ColorTheme;
}

export class Button extends React.Component<ButtonProps> {

	public render() {
		return (
			<View style={[styles.parentWrapper, this.props.disabled && styles.disabledParentWrapper]}>
				{
					this.props.disabled ?
					this.renderInnerContent() :
					<TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#e0e0e0', true)} onPress={this.onPress}>
						{this.renderInnerContent()}
					</TouchableNativeFeedback>
				}
			</View>
		);
	}

	private renderInnerContent() {
		const themeStyles = StyleSheet.create({
			wrapper: {
				shadowColor: themeSchema.button[this.props.theme].shadowColor,
			},
			text: {
				color: themeSchema.button[this.props.theme].fontColor,
			}
		});
		return (
			<View style={[styles.wrapper, themeStyles.wrapper, this.props.disabled && styles.disabledWrapper]}>
				<Text style={[styles.text, themeStyles.text]}>{this.props.title}</Text>
			</View>
		);
	}

	private onPress = async () => {
		await wait(1);
		this.props.onPress();
	}
}
