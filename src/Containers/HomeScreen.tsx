import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { themeSchema } from '../Core/ThemeSchema/themeSchema';
import { NavigationInjectedProps } from 'react-navigation';
import { Device } from '../Core/Entities/Device';
import { connect } from 'react-redux';
import { State } from '../Store/configureStore';
import { LoadingModal } from '../Components/LoadingModal';
import { DeviceBreathingModes } from '../Components/DeviceBreathingModes';
import { BreathingMode, BreathingSpeed } from '../Core/Entities/BreathingMode';
import { routeNames } from '../Navigators/Navigators';
import { Dispatch } from 'redux';
import { DeviceBreathingModeUpdateAction } from '../Store/Actions/Device/deviceBreathingModesActions';

const homeScreenStyles = StyleSheet.create({
	wrapper: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: themeSchema.color.backgroundColor,
	}
});

interface StateProps {
	activeDevice?: Device;
	breathingModes?: BreathingMode[];
	loading: boolean;
}

interface DispatchProps {
	updateDeviceBreathingMode: (device: Device, mode: BreathingMode) => void;
}

export type Props = NavigationInjectedProps & StateProps & DispatchProps;

class HomeScreenHOC extends React.Component<Props> {
	public render() {
		return (
			<ScrollView contentContainerStyle={homeScreenStyles.wrapper}>
				{ (this.props.loading || !this.props.breathingModes || !this.props.activeDevice) ?
					<LoadingModal/> :
					<DeviceBreathingModes activeDevice={this.props.activeDevice} breathingModes={this.props.breathingModes} goToModeDetail={this.goToModeDetail} /> 
				}
			</ScrollView>
		)
	}

	private goToModeDetail = (mode: BreathingMode, action: 'edit' | 'add', defaultSpeed?: keyof BreathingSpeed) => {
		const updateDeviceCallback = (mode: BreathingMode) => this.props.updateDeviceBreathingMode(this.props.activeDevice!, mode);
		this.props.navigation.navigate(routeNames.BreathingModeDetail, {
			mode,
			action,
			defaultSpeed,
			updateSpeed: updateDeviceCallback
		});
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
		updateDeviceBreathingMode: (device: Device, mode: BreathingMode) => {
			dispatch(DeviceBreathingModeUpdateAction(device, mode));
		}
	})
)(HomeScreenHOC);
