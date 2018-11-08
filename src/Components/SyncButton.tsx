import * as React from 'react';
import {Icon} from 'react-native-elements';
import {Animated} from 'react-native';
import {TouchableNativeFeedback} from 'react-native';

export interface SyncButtonProps {
	search: () => void;
	searching: boolean;
}

interface State {
	spinValue: Animated.Value;
	animation: Animated.CompositeAnimation;
}

export class SyncButton extends React.Component<SyncButtonProps, State> {

	public constructor(props: SyncButtonProps) {
		super(props);
		const spinValue = new Animated.Value(0);
		this.state = {
			spinValue,
			animation: Animated.loop(Animated.timing(
				spinValue,
				{
					toValue: new Animated.Value(1),
					duration: 500,
					useNativeDriver: true
				}
			))
		}

	}

	public componentWillReceiveProps(nextProps: SyncButtonProps) {
		if (nextProps.searching && !this.props.searching) {
			this.state.animation.start();
		}
		if (!nextProps.searching && this.props.searching) {
			this.state.spinValue.stopAnimation();
			this.state.spinValue.setValue(0);
			this.state.animation.stop();
		}
	}

	public render() {
		const spin = this.state.spinValue.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '-360deg']
		});
		return (
			<TouchableNativeFeedback>
				<Animated.View style={{
						transform: [{rotate: spin},{perspective: 1000}],
						position: 'relative',
						height: 30,
						width: 30,
						marginRight: 10,
					}} >
					<Icon
						name='sync'
						size={30}
						onPress={!this.props.searching ? this.props.search: null}
						containerStyle={{position: 'absolute', top: 0, left: 0 }}
					/>
				</Animated.View>
			</TouchableNativeFeedback>
		);
	}
}

