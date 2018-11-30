import * as React from 'react';
import { View, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { TextNormal } from '../Text/TextNormal';
import { Icon } from 'react-native-elements';
import { wait } from '../../Core/Helpers/wait';
import { themeSchema } from '../../Core/ThemeSchema/themeSchema';

export type Ripple = 'dark' | 'light';

export interface ListItemProps {
	title: string;
	onPress: () => void;
	ripple: Ripple | string;
	rightText?: JSX.Element;
}

const styles = StyleSheet.create({
	listItem: {
		paddingVertical: 10,
		flex: 1,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: themeSchema.list.offsetHorizontal,
	},
	wrapperView: {
		backgroundColor: 'transparent',
		marginHorizontal: -themeSchema.list.offsetHorizontal,
	}
});

export class ListItem extends React.Component<ListItemProps> {

	public render() {
		const rippleColor = this.props.ripple === 'light' ? 'rgba(255, 255, 255, .1)' : 'rgba(0, 0, 0, .1)';
		return (
			<View style={styles.wrapperView}>
				<TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(`${rippleColor}`, false)} onPress={this.onPress}>
					<View style={styles.listItem}>
						<TextNormal bold={false}>{this.props.title}</TextNormal>
						{
							(this.props.rightText) ?
								this.props.rightText :
								<Icon
									name='chevron-right'
									color='white'
									size={30}
								/>
						}
					</View>
				</TouchableNativeFeedback>
			</View>
		);
	}

	private onPress = async () => {
		await wait(1);
		this.props.onPress()
	}
}
