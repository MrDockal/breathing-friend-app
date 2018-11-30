import * as React from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import { wait } from '../../Core/Helpers/wait';
import { BackgroundGradient, ColorTheme } from '../BackgroundGradient/BackgroundGradient';
import { BreathingListItem } from './BreathingListItem';
import { DeviceImageWithIndex } from '../DeviceImageWithIndex/DeviceImageWithIndex';

export interface ActiveBreathingListItemProps {
	title: string;
	duration: string;
	speed: string;
	position: number;
	onPress: () => void;
	theme: ColorTheme;
	index: number;
}

export class ActiveBreathingListItem extends React.Component<ActiveBreathingListItemProps> {

	public render() {
		const icon = <DeviceImageWithIndex index={this.props.index.toString()} theme={this.props.theme} />
		return (
			<BackgroundGradient theme={this.props.theme}>
				<TouchableNativeFeedback
					background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .1)', false)}
					onPress={async () => {
						await wait(1);
						this.props.onPress();
					}}
				>
					<View>
						<BreathingListItem textTop={this.props.duration} textCenter={this.props.title} textBottom={this.props.speed} Icon={icon} />
					</View>
				</TouchableNativeFeedback>
			</BackgroundGradient>
		);
	}
}
