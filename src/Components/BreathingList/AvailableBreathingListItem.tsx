import * as React from 'react';
import { TouchableNativeFeedback, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { wait } from '../../Core/Helpers/wait';
import { BreathingListItem } from './BreathingListItem';
import { Hr } from '../Hr/Hr';

export interface AvailableBreathingListItemProps {
	title: string;
	duration: string;
	onPress: () => void;
}

export class AvailableBreathingListItem extends React.Component<AvailableBreathingListItemProps> {

	public render() {
		const icon = <Icon
			name='chevron-right'
			color='white'
			size={30}
		/>;
		return (
			<TouchableNativeFeedback
				background={TouchableNativeFeedback.Ripple('rgba(255, 255, 255, .1)', false)}
				onPress={async () => {
					await wait(1);
					this.props.onPress();
				}}
			>
				<View>
					<BreathingListItem textTop={this.props.duration} textCenter={this.props.title} textBottom={''} Icon={icon} />
					<Hr theme={'black'}/>
				</View>
			</TouchableNativeFeedback>
		);
	}
}
