import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Device } from '../Core/Entities/Device';
import { NavigationInjectedProps, NavigationEventSubscription } from 'react-navigation';
import { DeviceState } from '../Store/Reducers/deviceReducer';
import { State } from '../Store/configureStore';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { routeNames } from '../Navigators/Navigators';
import { discoverBondedDevicesAction, pauseDiscoverBondedDevicesAction } from '../Store/Actions/Device/devicesBondActions';
import { DeviceConnectionInitializeAction } from '../Store/Actions/Device/deviceActions';
import { Button } from '../Components/Button';
import { BackgroundGradient } from '../Components/BackgroundGradient';
import { H1 } from '../Components/Text/H1';
import { TextNormal } from '../Components/Text/TextNormal';
import { NoBreathingDevice } from '../Components/Signpost/NoBreathingDevice';
import { SignPost } from '../Components/Signpost/SignPost';

const mainScreenStyles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		textAlign: 'center',
		padding: 40,
	}
});


export interface OwnProps extends NavigationInjectedProps {
	/** EMPTY */
}

export interface StateProps {
	devices: DeviceState;
}

export interface DispatchProps {
	deviceConnectionInitialize: (device: Device) => void;
	startDiscoverConnectedDevices: () => void;
	pauseDiscoverConnectedDevices: () => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class SignpostScreenHOC extends React.Component<Props> {

	private didFocusSubscription: NavigationEventSubscription;
	private didBlurSubscription: NavigationEventSubscription;
	
	private didFocus = () => {
		this.props.startDiscoverConnectedDevices();
	}

	private didBlur = () => {
		this.props.pauseDiscoverConnectedDevices();
	}

	public componentDidMount() {
		this.didFocusSubscription = this.props.navigation.addListener('didFocus', this.didFocus);
		this.didBlurSubscription = this.props.navigation.addListener('didBlur', this.didBlur);
	}

	public componentWillUnmount() {
		this.didBlurSubscription.remove();
		this.didFocusSubscription.remove();
		this.props.pauseDiscoverConnectedDevices();
	}

	public render() {
		return (
			<React.Fragment>
				{
					this.props.devices.devices.length === 0 ?
					<NoBreathingDevice syncNewDevice={() => this.props.navigation.navigate(routeNames.BluetoothSearchDevices)}/> :
					<SignPost devices={this.props.devices.devices} initializeDevice={(device: Device) => {
						this.props.deviceConnectionInitialize(device);
						this.props.navigation.navigate(routeNames.MainApp);
					}} />
				}
			</React.Fragment>
		);
	}
}

export const SignpostScreen = connect<StateProps, DispatchProps, OwnProps>(
	(state: State, _ownProps: OwnProps) => ({
		devices: state.device,
	}),
	(dispatch: Dispatch) => ({
		deviceConnectionInitialize: (device: Device) => (
			dispatch(DeviceConnectionInitializeAction(device))
		),
		startDiscoverConnectedDevices: () => {
			dispatch(discoverBondedDevicesAction());
		},
		pauseDiscoverConnectedDevices: () => {
			dispatch(pauseDiscoverBondedDevicesAction());
		},
	}),
)(SignpostScreenHOC);
