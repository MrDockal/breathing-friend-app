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

const mainScreenStyles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 40,
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
			<View style={mainScreenStyles.wrapper}>
				<View></View>
				<View>
					<Text>This is the home screen of the app </Text>
					{
						this.props.devices.devices.map((device: Device, index: number) => (
							<Button
								key={index}
								disabled={!device.connected}
								onPress={() => {
									this.props.deviceConnectionInitialize(device);
									//this.props.setActiveDevice(device);
									this.props.navigation.navigate(routeNames.MainApp);
								}}
								title={device.name}
							/>
						))
					}
				</View>
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
