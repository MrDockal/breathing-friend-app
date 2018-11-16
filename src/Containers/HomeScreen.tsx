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

export type Props = NavigationInjectedProps & StateProps;

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
		this.props.navigation.navigate(routeNames.BreathingModeDetail, {
			mode,
			action,
			defaultSpeed,
		});
	}
}

export const HomeScreen = connect<StateProps>(
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
	}
)(HomeScreenHOC);
