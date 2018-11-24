import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ColorTheme } from '../BackgroundGradient';
import { TextNormal } from '../Text/TextNormal';
import { TextSmall } from '../Text/TextSmall';
import { themeSchema } from '../../Core/ThemeSchema/themeSchema';
const whiteBfImage = require('../../assets/white-bf.png');

export interface StatsListItemProps {
	theme: ColorTheme;
	title: string;
	rightText: string;
}

const styles = StyleSheet.create({
	wrapper: {
		paddingVertical: 6,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	inner: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	bfImage: {
		alignSelf: 'center',
		height: 50,
		width: 50,
	},
});

export class StatsListItem extends React.Component<StatsListItemProps> {
	public render() {
		const image = this.getBfImage();
		return <View style={[styles.wrapper]}>
			<View style={styles.inner}>
				<Image source={image} style={styles.bfImage} resizeMode={'cover'} />
				<TextSmall>{this.props.title}</TextSmall>
			</View>
			<TextNormal style={{ color: themeSchema.button[this.props.theme].fontColor }}>{this.props.rightText}</TextNormal>
		</View>
	}

	private getBfImage() {
		return whiteBfImage;
	}
}
