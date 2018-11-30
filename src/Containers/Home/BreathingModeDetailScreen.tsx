import React from 'react';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import { BreathingMode, BreathingSpeed, BreathingDefinition, DeviceSavedBreathingMode } from '../../Core/Entities/BreathingMode';
import { BreathingAnimation } from '../../Components/BreathingAnimation/BreathingAnimation';
import { Button } from '../../Components/Button/Button';
import { numberToBreathingConverter, breathingToNumberConverter } from '../../Core/Helpers/convertEntities';
import { TextNormal } from '../../Components/Text/TextNormal';
import { BackgroundGradient, ColorTheme } from '../../Components/BackgroundGradient/BackgroundGradient';
import { Slider } from '../../Components/Slider/Slider';
import { connect } from 'react-redux';
import { State } from '../../Store/configureStore';
import { HeaderlessView } from '../../Components/HeaderlessView/HeaderlessView';
import { i18n } from '../../Core/i18n/i18n';

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		textAlign: 'center',
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
		headerTitle: <TextNormal>{i18n.t(navigation.state.params!.mode.name)}</TextNormal>,
		headerTransparent: true,
		headerTintColor: 'white',
	});

	public render() {
		const buttonTitle = this.props.navigation.state.params!.action === 'edit' ? i18n.t('update') : i18n.t('continue');
		return (
			<BackgroundGradient theme={this.props.navigation.state.params!.theme}>
				<HeaderlessView contentContainerStyle={styles.wrapper}>
					<TextNormal>{i18n.t('breathe_together_with_animation')}</TextNormal>
					<BreathingAnimation breathing={this.state.activeBreathingDefinition} />
					<Slider defaultSliderValue={this.state.sliderValue} onChange={(sliderValue: number) => this.onSlidingComplete(sliderValue)} />
					{this.props.displayButton && <Button
						theme={this.props.navigation.state.params!.theme}
						title={buttonTitle}
						onPress={this.buttonCallback} />}
				</HeaderlessView>
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
