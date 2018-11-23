import * as React from 'react';
import { View, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { wait } from '../../Core/Helpers/wait';
import { TextSmall } from '../Text/TextSmall';
import { H2 } from '../Text/H2';

export interface AvailableBreathingListItemProps {
	title: string;
	duration: string;
	onPress: () => void;
}

export class AvailableBreathingListItem extends React.Component<AvailableBreathingListItemProps> {

	public render() {
		return (
			<TouchableNativeFeedback
				background={TouchableNativeFeedback.Ripple('rgba(255, 255, 255, .1)', false)}
				onPress={async() => {
					await wait(100);
					this.props.onPress();
				}}
			>
				<View>
					<View/>
					<View>
						<TextSmall>{this.props.duration}</TextSmall>
						<H2>{this.props.title}</H2>
						<TextSmall></TextSmall>
					</View>
					<Icon
						name='chevron-right'
						color='white'
						size={30}
					/>
				</View>
			</TouchableNativeFeedback>
		);
	}
}
