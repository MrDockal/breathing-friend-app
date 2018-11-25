import * as React from 'react';
import { TouchableNativeFeedback, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { wait } from '../../Core/Helpers/wait';
import { BreathingListItem } from './BreathingListItem';

const styles = StyleSheet.create({
	borderLine: {
		borderBottomWidth: 1,
		borderColor: 'white',
	}
});

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
				<View style={styles.borderLine}>
					<BreathingListItem textTop={this.props.duration} textCenter={this.props.title} textBottom={''} Icon={icon} />
				</View>
			</TouchableNativeFeedback>
		);
	}
}
