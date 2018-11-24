import * as React from 'react';
import { View, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { TextNormal } from '../Text/TextNormal';
import { Icon } from 'react-native-elements';
import { wait } from '../../Core/Helpers/wait';

export type Ripple = 'dark' | 'light';

export interface ListItemProps {
	title: string;
	onPress: () => void;
	ripple: Ripple | string;
	rightText?: JSX.Element;
}

const styles = StyleSheet.create({
	listItem: {
		paddingVertical: 12,
		flex: 1,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	wrapperView: {
		backgroundColor: 'transparent'
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
		await wait(100);
		this.props.onPress()
	}
}
