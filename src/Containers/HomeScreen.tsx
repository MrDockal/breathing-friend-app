import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { Device } from '../Core/Entities/Device';
import { connect } from 'react-redux';
import { State } from '../Store/configureStore';
import { LoadingModal } from '../Components/LoadingModal';
import { DeviceBreathingModes } from '../Components/DeviceBreathingModes';
import { BreathingMode, BreathingSpeed, DeviceSavedBreathingMode } from '../Core/Entities/BreathingMode';
import { routeNames } from '../Navigators/Navigators';
import { BackgroundGradientThemes, BackgroundGradient } from '../Components/BackgroundGradient';
import { Dispatch } from 'redux';
import { DeviceBreathingModeUpdateAction } from '../Store/Actions/Device/deviceBreathingModesActions';

const homeScreenStyles = StyleSheet.create({
	wrapper: {
		flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
	}
});

interface DispatchProps {
	updateBreathing: (mode: DeviceSavedBreathingMode, position: number) => void;
}

interface StateProps {
	activeDevice?: Device;
	breathingModes?: BreathingMode[];
	loading: boolean;
}

export type Props = NavigationInjectedProps & StateProps & DispatchProps;

class HomeScreenHOC extends React.Component<Props> {

	public render() {
		return (
			<BackgroundGradient theme={'black'}>
				<ScrollView contentContainerStyle={homeScreenStyles.wrapper}>
					{ (this.props.loading || !this.props.breathingModes || !this.props.activeDevice) ?
						<LoadingModal/> :
						<DeviceBreathingModes activeDevice={this.props.activeDevice} breathingModes={this.props.breathingModes} goToModeDetail={this.goToModeDetail} /> 
					}
				</ScrollView>
			</BackgroundGradient>
		)
	}

	private goToModeDetail = (mode: BreathingMode, action: 'edit' | 'add', theme: BackgroundGradientThemes, index: number, defaultSpeed?: keyof BreathingSpeed) => {
		const nextAction = (action === 'edit') ? this.props.updateBreathing : this.goToSelectPositionScreen;
		this.props.navigation.navigate(routeNames.BreathingModeDetail, {
			mode,
			action,
			defaultSpeed,
			theme,
			goNext: (mode: DeviceSavedBreathingMode, position: number) => nextAction(mode, position),
		});
	}
	private goToSelectPositionScreen = (mode: DeviceSavedBreathingMode) => {
		console.log('going next');
	}
}

export const HomeScreen = connect<StateProps, DispatchProps>(
	(state: State): StateProps => {
		if (state.device.activeDeviceIndex === -1) {
			return {
				loading: true,
			}
		} else {
			const activeDevice = state.device.devices[state.device.activeDeviceIndex];
			return {
				activeDevice,
				loading: false,
				breathingModes: state.breathing.modes
			}
		}
	},
	(dispatch: Dispatch) => ({
		updateBreathing: (mode: DeviceSavedBreathingMode, position: number) => {
			dispatch(DeviceBreathingModeUpdateAction(mode, position));
		}
	})
)(HomeScreenHOC);
