import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { Device } from '../Core/Entities/Device';
import { NavigationInjectedProps } from 'react-navigation';
import { DeviceState } from '../Store/Reducers/deviceReducer';
import { State } from '../Store/configureStore';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setActiveDeviceAction } from '../Store/Actions/deviceActions';
import { routeNames } from '../Navigators/Navigators';

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
	setActiveDevice: (device: Device) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class SignpostScreenHOC extends React.Component<Props> {
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
		setActiveDevice: (device: Device) => (
			dispatch(setActiveDeviceAction(device))
		)
	}),
)(SignpostScreenHOC);
