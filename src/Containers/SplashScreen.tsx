import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import SplashScreenRN from 'react-native-splash-screen';
import { NavigationInjectedProps } from 'react-navigation';
import { DeviceState } from '../Store/Reducers/deviceReducer';
import { connect } from 'react-redux';
import { State } from '../Store/configureStore';
import { Dispatch } from 'redux';
import { routeNames } from '../Navigators/Navigators';
import { BreathingInitLoadAction } from '../Store/Actions/breathingActions';
 
export interface OwnProps extends NavigationInjectedProps {
	/** EMPTY */
}

export interface StateProps {
	devices: DeviceState;
}

export interface DispatchProps {
	init: () => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class SplashScreenHOC extends React.Component<Props, {}> {

	public componentDidMount() {
		console.warn('semka sem');
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
		this.props.init();
		if (this.props.devices.activeDevice && this.props.devices.activeDevice.connected) {
			return this.props.navigation.navigate(routeNames.MainApp);
		} else {
			return this.props.navigation.navigate(routeNames.SignpostScreen);
		}
	}
}

export const SplashScreen = connect<StateProps, DispatchProps, OwnProps>(
	(state: State, _ownProps: OwnProps) => ({
		devices: state.device,
	}),
	(dispatch: Dispatch) => ({
		init: () => (
			dispatch(BreathingInitLoadAction())
		)
	}),
)(SplashScreenHOC);
