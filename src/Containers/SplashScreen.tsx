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

const splashScreensStyles = StyleSheet.create({
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

class SplashScreenHOC extends React.Component<Props, {}> {

	public componentDidMount() {
		SplashScreenRN.hide();
		this.bootstrapAsync();
	}

	public render() {
		return (
			<View style={splashScreensStyles.wrapper}>
				<Text>This is the home screen of the app</Text>
				{
					this.props.devices.devices.map((device: Device, index: number) => (
						<Button
							key={index}
							onPress={() => {
								this.props.setActiveDevice(device);
								this.props.navigation.navigate('Main');
							}}
							title={device.name}
						/>
					))
				}
				<Button
					onPress={() => this.props.navigation.navigate('SyncDevice')}
					title="Sync new device"
				/>
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
			return this.props.navigation.navigate('Main');
		}
	}
}

export const SplashScreen = connect<StateProps, DispatchProps, OwnProps>(
	(state: State, ownProps: OwnProps) => ({
		devices: state.device,
	}),
	(dispatch: Dispatch) => ({
		setActiveDevice: (device: Device) => (
			dispatch(setActiveDeviceAction(device))
		)
	}),
)(SplashScreenHOC);
