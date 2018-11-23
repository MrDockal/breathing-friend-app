import React from 'react';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import { BreathingMode, BreathingSpeed, BreathingDefinition } from '../Core/Entities/BreathingMode';
import { BreathingAnimation } from '../Components/BreathingAnimation';
import { Button } from '../Components/Button';
import { numberToBreathingConverter, breathingToNumberConverter } from '../Core/Helpers/convertEntities';
import { TextNormal } from '../Components/Text/TextNormal';
import { BackgroundGradient, BackgroundGradientThemes } from '../Components/BackgroundGradient';
import { Slider } from '../Components/Slider/Slider';

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		textAlign: 'center',
		paddingTop: 100,
		paddingBottom: 40,
	},
});

interface BreathingModeDetailScreenNavigationParams {
	mode: BreathingMode;
	action: 'edit' | 'add';
	theme: BackgroundGradientThemes,
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
		headerTitle: <TextNormal>{navigation.state.params!.mode.name}</TextNormal>,
		headerTransparent: true,
		headerTintColor: 'white',
	});

	public render() {
		const buttonCallback = (this.props.navigation.state.params!.action === 'edit') ?
			() => {
				this.props.navigation.state.params!.updateSpeed!(numberToBreathingConverter(this.state.sliderValue))
			} :
			() => false
		;
		return (
			<BackgroundGradient theme={this.props.navigation.state.params!.theme}>
				<View style={styles.wrapper}>
					<TextNormal>Dýchejte společně s animací</TextNormal>
					<BreathingAnimation breathing={this.state.activeBreathingDefinition} />
					<Slider defaultSliderValue={this.state.sliderValue} onChange={(sliderValue: number) => this.onSlidingComplete(sliderValue)} />
					<Button theme={this.props.navigation.state.params!.theme} title={this.props.navigation.state.params!.action.toUpperCase()} onPress={buttonCallback}/>
				</View>
			</BackgroundGradient>
		);
	}

	private onSlidingComplete = (sliderValue: number) => {
		const speedText = numberToBreathingConverter(sliderValue);
		this.setState((prevState: State) => ({
			activeBreathingDefinition: this.props.navigation.state.params!.mode.speed[speedText],
		}))
	}
}
