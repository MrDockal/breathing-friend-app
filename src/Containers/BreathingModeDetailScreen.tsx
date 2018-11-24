import React from 'react';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import { BreathingMode, BreathingSpeed, BreathingDefinition, DeviceSavedBreathingMode } from '../Core/Entities/BreathingMode';
import { BreathingAnimation } from '../Components/BreathingAnimation';
import { Button } from '../Components/Button';
import { numberToBreathingConverter, breathingToNumberConverter } from '../Core/Helpers/convertEntities';
import { TextNormal } from '../Components/Text/TextNormal';
import { BackgroundGradient, ColorTheme } from '../Components/BackgroundGradient';
import { Slider } from '../Components/Slider/Slider';
import { connect } from 'react-redux';
import { State } from '../Store/configureStore';

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
	theme: ColorTheme;
	goNext: (mode: DeviceSavedBreathingMode) => void;
	defaultSpeed?: keyof BreathingSpeed;
}

interface StateProps {
	displayButton: boolean;
}

interface OwnProps extends NavigationInjectedProps<BreathingModeDetailScreenNavigationParams> {
}

interface ComponentState {
	sliderValue: number;
	activeBreathingDefinition: BreathingDefinition;
}

type Props = OwnProps & StateProps;

export class BreathingModeDetailScreenHOC extends React.Component<Props, ComponentState> {

	public constructor(props: Props) {
		super(props);
		const defaultSpeed = (props.navigation.state.params!.defaultSpeed) ? props.navigation.state.params!.defaultSpeed! : 'normal';
		this.state = {
			sliderValue: breathingToNumberConverter(defaultSpeed),
			activeBreathingDefinition: this.props.navigation.state.params!.mode.speed[defaultSpeed],
		}
	}

	static navigationOptions = ({ navigation }: NavigationScreenProps<BreathingModeDetailScreenNavigationParams>) => ({
		headerTitle: <TextNormal>{navigation.state.params!.mode.name}</TextNormal>,
		headerTransparent: true,
		headerTintColor: 'white',
	});

	public render() {
		const buttonTitle = this.props.navigation.state.params!.action === 'edit' ? 'Aktualizovat' : 'Pokračovat'
		return (
			<BackgroundGradient theme={this.props.navigation.state.params!.theme}>
				<View style={styles.wrapper}>
					<TextNormal>Dýchejte společně s animací</TextNormal>
					<BreathingAnimation breathing={this.state.activeBreathingDefinition} />
					<Slider defaultSliderValue={this.state.sliderValue} onChange={(sliderValue: number) => this.onSlidingComplete(sliderValue)} />
					{this.props.displayButton && <Button
						theme={this.props.navigation.state.params!.theme}
						title={buttonTitle}
						onPress={this.buttonCallback} />}
				</View>
			</BackgroundGradient>
		);
	}

	private buttonCallback = () => {
		const speed = numberToBreathingConverter(this.state.sliderValue);
		this.props.navigation.state.params!.goNext({
			speed,
			uid: this.props.navigation.state.params!.mode.uid
		});
	}

	private onSlidingComplete = (sliderValue: number) => {
		const speedText = numberToBreathingConverter(sliderValue);
		this.setState((prevState: ComponentState) => ({
			activeBreathingDefinition: this.props.navigation.state.params!.mode.speed[speedText],
		}))
	}
}

export const BreathingModeDetailScreen = connect<StateProps>(
	(state: State): StateProps => ({
		displayButton: state.device.devices[state.device.activeDeviceIndex].connected
	})
)(BreathingModeDetailScreenHOC);
