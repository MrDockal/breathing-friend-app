import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ColorTheme } from '../BackgroundGradient/BackgroundGradient';
import { TextNormal } from '../Text/TextNormal';
import { TextSmall } from '../Text/TextSmall';
import { themeSchema } from '../../Core/ThemeSchema/themeSchema';
import { CustomIcon } from '../CustomIcon/CustomIcon';

export interface StatsListItemProps {
	theme: ColorTheme;
	title: string;
	rightText: string;
}

const styles = StyleSheet.create({
	wrapper: {
		paddingVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	inner: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	text: {
		paddingLeft: 20,
	}
});

export class StatsListItem extends React.Component<StatsListItemProps> {
	public render() {
		const color = this.getColor();
		return <View style={[styles.wrapper]}>
			<View style={styles.inner}>
				<CustomIcon name={'bf-yelow'} size={35} color={color} />
				<TextSmall style={styles.text}>{this.props.title}</TextSmall>
			</View>
			<TextNormal style={{ color }}>{this.props.rightText}</TextNormal>
		</View>
	}

	private getColor() {
		if (this.props.theme === 'black') {
			return 'white';
		} else {
			return themeSchema.button[this.props.theme].fontColor;
		}
	}
}
