import React from 'react';
import { View, Text } from 'react-native';
import SplashScreenRN from 'react-native-splash-screen';
import { NavigationInjectedProps } from 'react-navigation';
import { DeviceState } from '../../Store/Reducers/deviceReducer';
import { connect } from 'react-redux';
import { State } from '../../Store/configureStore';
import { Dispatch } from 'redux';
import { routeNames } from '../../Navigators/Navigators';
import { BreathingInitLoadAction } from '../../Store/Actions/breathingActions';
import { discoverBondedDevicesAction } from '../../Store/Actions/Device/devicesBondActions';

export interface OwnProps extends NavigationInjectedProps {
	/** EMPTY */
}

export interface StateProps {
	devices: DeviceState;
	discovered: boolean;
	breathingLoaded: boolean;
}

export interface DispatchProps {
	breathingInit: () => void;
	startDiscoverConnectedDevices: () => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class SplashScreenHOC extends React.Component<Props, {}> {

	private timeout: any;

	public componentDidMount() {
		this.props.breathingInit();
		this.props.startDiscoverConnectedDevices();
	}

	public render() {
		this.bootstrapAsync();
		return (
			<View>
				<Text />
			</View>
		)
	}

	private goToScreenWithDelay(screen: string) {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			SplashScreenRN.hide(),
				this.props.navigation.navigate(screen)
		}, 200);
	}

	private async bootstrapAsync() {
		if (!this.props.discovered) {
			return;
		}
		this.goToScreenWithDelay(routeNames.SignpostScreen);
	}
}

export const SplashScreen = connect<StateProps, DispatchProps, OwnProps>(
	(state: State, _ownProps: OwnProps): StateProps => ({
		devices: state.device,
		discovered: state.device.discover.initialDiscoverDone,
		breathingLoaded: state.breathing.modes.length > 0,
	}),
	(dispatch: Dispatch): DispatchProps => ({
		breathingInit: () => {
			dispatch(BreathingInitLoadAction());
		},
		startDiscoverConnectedDevices: () => {
			dispatch(discoverBondedDevicesAction());
		},
	}),
)(SplashScreenHOC);
