import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextSmall } from '../Components/Text/TextSmall';
import { connect } from 'react-redux';
import { State } from '../Store/configureStore';
import { Dispatch } from 'redux';
import { WatchDeviceConnectionChangesAction } from '../Store/Actions/Device/devicesBondActions';
import { themeSchema } from '../Core/ThemeSchema/themeSchema';
import { Device } from '../Core/Entities/Device';
import { i18n } from '../Core/i18n/i18n';

const styles = StyleSheet.create({
	wrapper: {
		position: 'absolute',
		bottom: themeSchema.bottomNavigation.panel.height,
	},
	connected: {
		opacity: 0,
	},
	disconnected: {
		backgroundColor: themeSchema.color.red
	},
})

interface StateProps {
	device: Device;
}

interface DispatchProps {
	start: (device: Device) => void;
}

export type Props = StateProps & DispatchProps;

class DeviceConnectionInfoBarHOC extends React.Component<Props> {

	public componentDidMount() {
		this.props.start(this.props.device);
	}

	public render() {
		const isConnected = this.props.device && this.props.device.connected;
		return (
			<View style={isConnected ? styles.connected : styles.disconnected}>
				<TextSmall>{!isConnected && i18n.t('device_is_offline')}</TextSmall>
			</View>
		)
	}
}

export const DeviceConnectionInfoBar = connect<StateProps, DispatchProps>(
	(state: State) => ({
		device: state.device.devices[state.device.activeDeviceIndex],
	}),
	(dispatch: Dispatch) => ({
		start: (device: Device) => {
			dispatch(WatchDeviceConnectionChangesAction(device));
		}
	})
)(DeviceConnectionInfoBarHOC);
