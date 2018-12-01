import React from 'react';
import { ScrollView, StyleSheet, View, ToastAndroid } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { Device } from '../../Core/Entities/Device';
import { connect } from 'react-redux';
import { State } from '../../Store/configureStore';
import { DeviceBreathingModes } from '../../Components/DeviceBreathingModes/DeviceBreathingModes';
import { BreathingMode, BreathingSpeed, DeviceSavedBreathingMode } from '../../Core/Entities/BreathingMode';
import { routeNames } from '../../Navigators/Navigators';
import { ColorTheme, BackgroundGradient } from '../../Components/BackgroundGradient/BackgroundGradient';
import { Dispatch } from 'redux';
import { DeviceBreathingModeUpdateAction } from '../../Store/Actions/Device/deviceBreathingModesActions';
import { DeviceConnectionInfoBar } from '../DeviceConnectionInfoBar';
import { ActivityIndicator } from '../../Components/ActivityIndicator/ActivityIndicator';

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
					{(this.props.loading || !this.props.breathingModes || this.props.breathingModes.length === 0 || !this.props.activeDevice || this.props.activeDevice.breathingModes.length === 0) ?
						<ActivityIndicator /> :
						<React.Fragment>
							<DeviceBreathingModes activeDevice={this.props.activeDevice} breathingModes={this.props.breathingModes} onPress={this.goToModeDetail} />
						</React.Fragment>
					}
				</ScrollView>
				<DeviceConnectionInfoBar />
			</BackgroundGradient>
		)
	}

	private goToModeDetail = (mode: BreathingMode, action: 'edit' | 'add', theme: ColorTheme, index: number, defaultSpeed?: keyof BreathingSpeed) => {
		const nextAction = (action === 'edit') ? this.updateBreathing : this.goToSelectPositionScreen;
		this.props.navigation.navigate(routeNames.BreathingModeDetailScreen, {
			mode,
			action,
			defaultSpeed,
			theme,
			goNext: (mode: DeviceSavedBreathingMode) => nextAction(mode, index),
		});
	}

	private goToSelectPositionScreen = (mode: DeviceSavedBreathingMode) => {
		this.props.navigation.navigate(routeNames.SelectPositionScreen, { mode });
	}

	private updateBreathing = (mode: DeviceSavedBreathingMode, index: number) => {
		console.log('updateBreathing index 2', index);
		this.props.updateBreathing(mode, index);
		this.props.navigation.navigate(routeNames.HomeScreen);
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
