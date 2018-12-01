import * as React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TextSmall } from '../Text/TextSmall';
import { ColorTheme } from '../BackgroundGradient/BackgroundGradient';
import { themeSchema } from '../../Core/ThemeSchema/themeSchema';
const whiteBfImage = require('../../assets/white-bf.png');

const styles = StyleSheet.create({
	wrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		right: 20,
	},
	absolute: {
		...StyleSheet.absoluteFillObject,
	},
	bfImage: {
		height: 60,
		width: 70,
		position: 'absolute',
	},
	text: {
		color: 'black',
		position: 'absolute',
	},
	textRed: {
		color: themeSchema.button.red.fontColor,
	},
	textBlue: {
		color: themeSchema.button.blue.fontColor,
	},
	textOrange: {
		color: themeSchema.button.orange.fontColor,
	}
});

export interface DeviceImageWithIndexProps {
	index: string;
	theme: ColorTheme;
}

export class DeviceImageWithIndex extends React.Component<DeviceImageWithIndexProps> {
	public render() {
		const color = (() => {
			switch(this.props.theme) {
				case 'red':
					return styles.textRed;
				case 'blue':
					return styles.textBlue;
				case 'orange':
					return styles.textOrange;
			}
		})();
		return (
			<View style={styles.wrapper}>
				<Image source={whiteBfImage} style={styles.bfImage} resizeMode={'cover'} />
				<TextSmall style={[styles.text, color]}>{this.props.index}</TextSmall>
			</View>
		);
	}
}