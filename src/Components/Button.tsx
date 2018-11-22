import * as React from 'react';
import { View, StyleSheet, Text,TouchableNativeFeedback } from 'react-native';
import { themeSchema } from '../Core/ThemeSchema/themeSchema';
import { wait } from '../Core/Helpers/wait';

const styles = StyleSheet.create({
	parentWrapper: {
		backgroundColor: 'white',
		borderRadius: 25,
		shadowOffset: {
			width: 0,
			height: 3
		  },
		  shadowRadius: 5,
		  shadowOpacity: 1,
		  elevation: 8,
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
	theme: ButtonThemes;
}

export type ButtonThemes = 'blue' | 'orange' | 'red' | 'black';

export class Button extends React.Component<ButtonProps> {

	public render() {
		const themeStyles = StyleSheet.create({
			wrapper: {
				shadowColor: themeSchema.button[this.props.theme].shadowColor,
			},
			text: {
				color: themeSchema.button[this.props.theme].fontColor,
			}
		});
		return (
			<View style={styles.parentWrapper}>
				<TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#e0e0e0', true)} onPress={this.onPress}>
					<View style={[styles.wrapper, themeStyles.wrapper]}>
						<Text style={[styles.text, themeStyles.text]}>{this.props.title}</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
		);
	}

	private onPress = async() => {
		await wait(100);
		this.props.onPress();
	}
}
