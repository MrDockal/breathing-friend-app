import * as React from 'react';
import { Animated, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BreathingDefinition } from '../../Core/Entities/BreathingMode';
const bfImage = require('../../assets/white-bf.png');
const bfShadow = require('../../assets/breathing.png');

const styles = StyleSheet.create({
	wrapper: {
		alignItems: 'center',
		position: 'relative',
		height: 130 * 3,
	},
	shadow: {
		position: 'absolute',
		top: 142,
		left: -53,
		height: 130,
		width: 110,
	},
	image: {
		position: 'absolute',
		top: 110,
		height: 200,
		width: 180,
	}
});

export interface BreathingAnimationProps {
	breathing: BreathingDefinition;
}

interface State {
	sizeValue: Animated.Value;
}

export class BreathingAnimation extends React.Component<BreathingAnimationProps, State> {

	public constructor(props: BreathingAnimationProps) {
		super(props);
		const sizeValue = new Animated.Value(0);
		this.state = {
			sizeValue,
		}
	}

	public componentDidMount() {
		this.createAnimationFromProps(this.props.breathing).start();
	}

	public componentWillUnmount() {
		this.createAnimationFromProps(this.props.breathing).stop();
	}

	public render() {
		return (
			<View style={styles.wrapper}>
				<Animated.Image
					source={bfShadow}
					style={[styles.shadow, {
						transform: [
							{
								scaleX: this.state.sizeValue.interpolate({
									inputRange: [0, 1],
									outputRange: [1, 3.5]
								}),
							},
							{
								scaleY: this.state.sizeValue.interpolate({
									inputRange: [0, 1],
									outputRange: [1, 3.5]
								})
							}
						]
					}]}
				/>
				<Animated.Image
					source={bfImage}
					style={[styles.image, {
						transform: [
							{
								scaleX: this.state.sizeValue.interpolate({
									inputRange: [0, 1],
									outputRange: [1, 1.3]
								}),
							},
							{
								scaleY: this.state.sizeValue.interpolate({
									inputRange: [0, 1],
									outputRange: [1, 1.3]
								})
							}
						]
					}]}
				/>
			</View>
		)
	}

	private createAnimationFromProps(breathing: BreathingDefinition) {
		const totalSteps = breathing.freqIn + breathing.freqHold1 + breathing.freqOut + breathing.freqOut;
		const frequencyRatio = breathing.cycleSpeedStart / totalSteps
		const durationIn = frequencyRatio * breathing.freqIn * 1E3;
		const durationHold1 = frequencyRatio * breathing.freqHold1 * 1E3;
		const durationOut = frequencyRatio * breathing.freqOut * 1E3;
		const durationHold2 = frequencyRatio * breathing.freqHold2 * 1E3;
		const breatheIn = Animated.timing(this.state.sizeValue, {
			toValue: 1,
			duration: durationIn,
			useNativeDriver: true,
		});
		const hold1 = Animated.timing(this.state.sizeValue, {
			toValue: 1,
			duration: durationHold1,
			useNativeDriver: true,
		});
		const breatheOut = Animated.timing(this.state.sizeValue, {
			toValue: 0,
			duration: durationOut,
			useNativeDriver: true,
		});
		const hold2 = Animated.timing(this.state.sizeValue, {
			toValue: 0,
			duration: durationHold2,
			useNativeDriver: true,
		});
		return Animated.loop(Animated.sequence([
			breatheIn,
			hold1,
			breatheOut,
			hold2,
		]));
	}

	public componentWillReceiveProps(nextProps: BreathingAnimationProps) {
		if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
			const animation = this.createAnimationFromProps(nextProps.breathing);
			this.state.sizeValue.stopAnimation();
			this.state.sizeValue.setValue(0);
			animation.start();
		}
	}
}