import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import SplashScreenRN from 'react-native-splash-screen';
import { NavigationInjectedProps } from 'react-navigation';
import { DeviceState } from '../Store/Reducers/devicesReducer';
import { connect } from 'react-redux';
import { Device } from '../Core/Entities/Device';
import { State } from '../Store/configureStore';
import { Dispatch } from 'redux';
import { setActiveDeviceAction } from '../Store/Actions/deviceActions';
import { routeNames } from '../Navigators/Navigators';
 
export interface OwnProps extends NavigationInjectedProps {
	/** EMPTY */
}

export interface StateProps {
	devices: DeviceState;
}

type Props = OwnProps & StateProps;

class SplashScreenHOC extends React.Component<Props, {}> {

	public componentDidMount() {
		SplashScreenRN.hide();
		this.bootstrapAsync();
	}

	public render() {
		return (
			<View>
				<Text>Fofo</Text>
			</View>
		)
	}

	private bootstrapAsync(): any {
		/**
		 * 1) Sleduj změny verzí
		 * 2) Pokud 2 a více dýchátek, renderuj Spashscreen
		 * 3) Pokud aktivní dýchátko jdi na Main
		 */
		if (this.props.devices.activeDevice) {
			return this.props.navigation.navigate(routeNames.MainApp);
		} else {
			return this.props.navigation.navigate(routeNames.SignpostScreen);
		}
	}
}

export const SplashScreen = connect<StateProps, {}, OwnProps>(
	(state: State, _ownProps: OwnProps) => ({
		devices: state.device,
	}),
	(dispatch: Dispatch) => ({
		setActiveDevice: (device: Device) => (
			dispatch(setActiveDeviceAction(device))
		)
	}),
)(SplashScreenHOC);
