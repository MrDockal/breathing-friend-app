import React from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { routeNames } from '../../Navigators/Navigators';
import { connect } from 'react-redux';
import { State } from '../../Store/configureStore';
import { BreathingReinitializeAction } from '../../Store/Actions/breathingActions';
import { Dispatch } from 'redux';
import { BackgroundGradient } from '../../Components/BackgroundGradient/BackgroundGradient';
import { List } from '../../Components/List/List';
import { TextNormal } from '../../Components/Text/TextNormal';
import { DeviceTile } from '../../Components/DeviceTile/DeviceTile';
import { DeviceConnectionInfoBar } from '../DeviceConnectionInfoBar';

const styles = StyleSheet.create({
	wrapper: {
		flexGrow: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
	},
	emptySpace: {
		paddingVertical: 10,
	}
});

interface DispatchProps {
	disconnectDevice: (deviceUid: string) => void;
	reinitialize: () => void;
}

interface StateProps {
	deviceName: string;
	deviceUid: string;
}

type OwnProps = NavigationInjectedProps;
type Props = OwnProps & DispatchProps & StateProps;

class SettingsScreenHOC extends React.Component<Props> {

	public render() {
		const listItems = [{
			title: 'Baterie zařízení',
			onPress: () => false,
			rightText: <TextNormal>10%</TextNormal>,
			ripple: 'light'
		}, {
			title: 'Přejmenovat',
			onPress: () => this.props.navigation.navigate(routeNames.SettingsRenameDeviceNameScreen),
			ripple: 'light'
		}, {
			title: 'Přepnout zařízení',
			onPress: () => this.props.navigation.navigate(routeNames.SignpostScreen),
			ripple: 'light'
		}];

		const listItems2 = [{
			title: 'O Breathing friend',
			onPress: () => this.props.navigation.navigate(routeNames.SettingsAboutAppScreen),
			ripple: 'light'
		}, {
			title: 'Ohodnotit aplikaci',
			onPress: () => false,
			ripple: 'light'
		}, {
			title: 'Nahlásit chybu',
			onPress: () => this.props.navigation.navigate(routeNames.SettingsReportBugScreen),
			ripple: 'light'
		}];

		const listItems3 = [{
			title: 'Odpojit zařízení',
			onPress: this.disconnectDevice,
			ripple: 'light'
		}, {
			title: 'Reinicializace',
			onPress: () => this.props.reinitialize(),
			ripple: 'light'
		}];
		return (
			<BackgroundGradient theme={'black'}>
				<ScrollView contentContainerStyle={styles.wrapper}>
					<DeviceTile name={this.props.deviceName} />
					<List listItems={listItems} />
					<View style={styles.emptySpace} />
					<List listItems={listItems2} />
					<View style={styles.emptySpace} />
					<List listItems={listItems3} />
				</ScrollView>
				<DeviceConnectionInfoBar />
			</BackgroundGradient>
		)
	}

	private disconnectDevice = () => {
		Alert.alert(
			'Odpojit zařízení',
			'Tato akce odpojí zařízení od všeho účtu a odstraní statistiky používání. Zařízení si budete moci znovu spárovat.',
			[
			  {text: 'Zrušit', onPress: () => false, style: 'cancel'},
			  {text: 'Odpojit', onPress: () => this.props.disconnectDevice(this.props.deviceUid)},
			],
			{ cancelable: false }
		  )
	}
}

export const SettingsScreen = connect<StateProps, DispatchProps, OwnProps>(
	(state: State, _ownProps: OwnProps) => ({
		deviceName: state.device.devices[state.device.activeDeviceIndex].name,
		deviceUid: state.device.devices[state.device.activeDeviceIndex].uid
	}),
	(dispatch: Dispatch) => ({
		reinitialize: () => {
			dispatch(BreathingReinitializeAction());
		},
		disconnectDevice: (deviceUid: string) => {
			dispatch(BreathingReinitializeAction());
		}
	}),
)(SettingsScreenHOC);
