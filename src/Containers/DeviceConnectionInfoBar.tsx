import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextSmall } from '../Components/Text/TextSmall';
import { connect } from 'react-redux';
import { State } from '../Store/configureStore';
import { Dispatch } from 'redux';
import { WatchDeviceConnectionChangesAction } from '../Store/Actions/Device/devicesBondActions';
import { themeSchema } from '../Core/ThemeSchema/themeSchema';

const styles = StyleSheet.create({
	wrapper: {
		position: 'absolute',
		bottom: themeSchema.bottomNavigation.panel.height,
	},
	connected: {
		opacity: 0,
	},
	disconnected: {
		backgroundColor: 'red'
	},
})

interface StateProps {
	connected: boolean;
}

interface DispatchProps {
	start: () => void;
}

export type Props = StateProps & DispatchProps;

class DeviceConnectionInfoBarHOC extends React.Component<Props> {

	public componentDidMount() {
		this.props.start();
	}

	public render() {
		return (
			<View style={this.props.connected ? styles.connected : styles.disconnected}>
				<TextSmall>{!this.props.connected && 'zařízení je offline'}</TextSmall>
			</View>
		)
	}
}

export const DeviceConnectionInfoBar = connect<StateProps, DispatchProps>(
	(state: State) => ({
		connected: state.device.activeDeviceIndex > -1 && state.device.devices[state.device.activeDeviceIndex].connected,
	}),
	(dispatch: Dispatch) => ({
		start: () => {
			dispatch(WatchDeviceConnectionChangesAction());
		}
	})
)(DeviceConnectionInfoBarHOC);
