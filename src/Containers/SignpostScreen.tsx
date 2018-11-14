import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { Device } from '../Core/Entities/Device';
import { NavigationInjectedProps, NavigationEventSubscription } from 'react-navigation';
import { DeviceState } from '../Store/Reducers/deviceReducer';
import { State } from '../Store/configureStore';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { routeNames } from '../Navigators/Navigators';
import { discoverBondedDevicesAction, pauseDiscoverBondedDevicesAction } from '../Store/Actions/Device/devicesBondActions';
import { setActiveDeviceAction } from '../Store/Actions/Device/deviceActions';
import { DeviceBreathingModesLoadAction } from '../Store/Actions/Device/deviceBreathingModesActions';

const mainScreenStyles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});


export interface OwnProps extends NavigationInjectedProps {
	/** EMPTY */
}

export interface StateProps {
	devices: DeviceState;
}

export interface DispatchProps {
	loadDeviceBreathingModes: (device: Device) => void;
	setActiveDevice: (device: Device) => void;
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
	}

	public render() {
		return (
			<View style={mainScreenStyles.wrapper}>
				<Text>This is the home screen of the app</Text>
				{
					this.props.devices.devices.map((device: Device, index: number) => (
						<Button
							key={index}
							disabled={!device.connected}
							onPress={() => {
								this.props.loadDeviceBreathingModes(device);
								this.props.setActiveDevice(device);
								this.props.navigation.navigate(routeNames.MainApp);
							}}
							title={device.name}
						/>
					))
				}
				<Button
					onPress={() => this.props.navigation.navigate(routeNames.BluetoothSearchDevices)}
					title="Sync new device"
				/>
			</View>
		);
	}
}

export const SignpostScreen = connect<StateProps, DispatchProps, OwnProps>(
	(state: State, _ownProps: OwnProps) => ({
		devices: state.device,
	}),
	(dispatch: Dispatch) => ({
		loadDeviceBreathingModes: (device: Device) => (
			dispatch(DeviceBreathingModesLoadAction(device.uid))
		),
		setActiveDevice: (device: Device) => (
			dispatch(setActiveDeviceAction(device))
		),
		startDiscoverConnectedDevices: () => {
			dispatch(discoverBondedDevicesAction());
		},
		pauseDiscoverConnectedDevices: () => {
			dispatch(pauseDiscoverBondedDevicesAction());
		},
	}),
)(SignpostScreenHOC);
