import React from 'react';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import { View, Text, StyleSheet, Slider } from 'react-native';
import { BreathingMode, BreathingSpeed, BreathingDefinition } from '../Core/Entities/BreathingMode';
import { BreathingAnimation } from '../Components/BreathingAnimation';
import { Button } from '../Components/Button';
import { numberToBreathingConverter, breathingToNumberConverter } from '../Core/Helpers/convertEntities';

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 40,
	},
	slider: {
		width: 200,
	}
});

interface BreathingModeDetailScreenNavigationParams {
	mode: BreathingMode;
	action: 'edit' | 'add';
	defaultSpeed?: keyof BreathingSpeed;
	updateSpeed?: (speed: keyof BreathingSpeed) => void;
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
			sliderValue: breathingToNumberConverter(defaultSpeed),
			activeBreathingDefinition: this.props.navigation.state.params!.mode.speed[defaultSpeed],
		}
	}

	static navigationOptions = ({navigation}: NavigationScreenProps<BreathingModeDetailScreenNavigationParams>) => ({
		title: navigation.state.params!.mode.name,
	});

	public render() {
		const buttonCallback = (this.props.navigation.state.params!.action === 'edit') ?
			() => {
				this.props.navigation.state.params!.updateSpeed!(numberToBreathingConverter(this.state.sliderValue))
			} :
			() => false
		;
		return (
			<View style={styles.wrapper}>
				<Text>Dýchejte společně s animací</Text>
				<BreathingAnimation breathing={this.state.activeBreathingDefinition} />
				<Slider
					style={styles.slider}
					minimumValue={0}
					maximumValue={2}
					step={1}
					value={this.state.sliderValue}
					onValueChange={(sliderValue: number) => this.setState({sliderValue})}
					onSlidingComplete={this.onSlidingComplete}
				/>
				<Button theme={'black'} title={this.props.navigation.state.params!.action.toUpperCase()} onPress={buttonCallback}/>
			</View>
		);
	}

	private onSlidingComplete = () => {
		const speedText = numberToBreathingConverter(this.state.sliderValue);
		this.setState((prevState: State) => ({
			activeBreathingDefinition: this.props.navigation.state.params!.mode.speed[speedText],
		}))
	}
}
