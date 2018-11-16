import React from 'react';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import { View, Text, StyleSheet, Slider } from 'react-native';
import { BreathingMode, BreathingSpeed, BreathingDefinition } from '../Core/Entities/BreathingMode';
import { BreathingAnimation } from '../Components/BreathingAnimation';
import { Button } from '../Components/Button';

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 40,
	}
});

interface BreathingModeDetailScreenNavigationParams {
	mode: BreathingMode,
	action: 'edit' | 'add',
	defaultSpeed?: keyof BreathingSpeed;
}

interface OwnProps extends NavigationInjectedProps<BreathingModeDetailScreenNavigationParams> {

}

interface State {
	sliderValue: number;
	activeBreathingDefinition: BreathingDefinition;
}

type Props = OwnProps;

export class BreathingModeDetailScreen extends React.Component<Props, State> {
	
	public constructor(props: Props) {
		super(props);
		const defaultSpeed = (props.navigation.state.params!.defaultSpeed) ? props.navigation.state.params!.defaultSpeed! : 'normal';
		this.state = {
			sliderValue: this.breathingToNumberConverter(defaultSpeed),
			activeBreathingDefinition: this.props.navigation.state.params!.mode.speed[defaultSpeed],
		}
	}

	static navigationOptions = ({navigation}: NavigationScreenProps<BreathingModeDetailScreenNavigationParams>) => ({
		title: navigation.state.params!.mode.name,
	});

	public render() {
		return (
			<View style={styles.wrapper}>
				<Text>Dýchejte společně s animací</Text>
				<BreathingAnimation breathing={this.state.activeBreathingDefinition} />
				<Slider
					style={{width: 200}}
					minimumValue={0}
					maximumValue={2}
					step={1}
					value={this.state.sliderValue}
					onValueChange={(sliderValue: number) => this.setState({sliderValue})}
					onSlidingComplete={this.onSlidingComplete}
				/>
				<Button title={this.props.navigation.state.params!.action.toUpperCase()} onPress={() => false}/>
			</View>
		);
	}

	private breathingToNumberConverter(breathingSpeed: keyof BreathingSpeed) {
		switch (breathingSpeed) {
			case 'slow':
				return 0;
			case 'normal':
				return 1;
			case 'fast':
				return 2;
			default:
				console.warn(`Unknown speed ${breathingSpeed}`);
				return 1;
		}
	}

	private numberToBreathingConverter(sliderValue: number): keyof BreathingSpeed {
		switch (sliderValue) {
			case 0:
				return 'slow';
			case 1:
				return 'normal';
			case 2:
				return 'fast';
			default:
				console.warn(`Unknown speed ${sliderValue}`);
				return 'normal';
		}
	}

	private onSlidingComplete = () => {
		const speedText = this.numberToBreathingConverter(this.state.sliderValue);
		this.setState((prevState: State) => ({
			activeBreathingDefinition: this.props.navigation.state.params!.mode.speed[speedText],
		}))
	}
}
