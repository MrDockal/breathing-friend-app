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
import { Device } from '../../Core/Entities/Device';
import { DeviceConnectionRemoveAction } from '../../Store/Actions/Device/deviceActions';
import { i18n } from '../../Core/i18n/i18n';
import { Hr } from '../../Components/Hr/Hr';

const styles = StyleSheet.create({
	wrapper: {
		flexGrow: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
	},
	deviceTitleWrapper: {
		paddingVertical: 30,
	}
});

interface DispatchProps {
	disconnectDevice: (device: Device) => void;
	reinitialize: () => void;
}

interface StateProps {
	device: Device;
}

type OwnProps = NavigationInjectedProps;
type Props = OwnProps & DispatchProps & StateProps;

class SettingsScreenHOC extends React.Component<Props> {

	public render() {
		const battery = this.props.device.battery ? `${this.props.device.battery}%` : 'n/a';
		const listItems = [{
			title: i18n.t('battery'),
			onPress: () => false,
			rightText: <TextNormal>{battery}</TextNormal>,
			ripple: 'light'
		}, {
			title: i18n.t('rename'),
			onPress: () => this.props.navigation.navigate(routeNames.SettingsRenameDeviceNameScreen),
			ripple: 'light'
		}, {
			title: i18n.t('switch_device'),
			onPress: () => this.props.navigation.navigate(routeNames.SignpostScreen),
			ripple: 'light'
		}];

		const listItems2 = [{
			title: i18n.t('about_app'),
			onPress: () => this.props.navigation.navigate(routeNames.SettingsAboutAppScreen),
			ripple: 'light'
		}, {
			title: i18n.t('rate_app'),
			onPress: () => false,
			ripple: 'light'
		}, {
			title: i18n.t('report_bug'),
			onPress: () => this.props.navigation.navigate(routeNames.SettingsReportBugScreen),
			ripple: 'light'
		}];

		const listItems3 = [{
			title: i18n.t('deprovision_device'),
			onPress: this.disconnectDevice,
			ripple: 'light'
		}];

		const listItemsDev3 = [{
			title: i18n.t('deprovision_device'),
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
					<View style={styles.deviceTitleWrapper}>
						<DeviceTile name={this.props.device.name} />
					</View>
					<List listItems={listItems} />
					<List listItems={listItems2} />
					<List listItems={listItems3} />
					<Hr theme={'white'} />
				</ScrollView>
				<DeviceConnectionInfoBar />
			</BackgroundGradient>
		)
	}

	private disconnectDevice = () => {
		Alert.alert(
			i18n.t('deprovision_device'),
			i18n.t('deprovision_device_text'),
			[
				{ text: i18n.t('cancel'), onPress: () => false, style: 'cancel' },
				{
					text: i18n.t('detach'), onPress: () => {
						this.props.navigation.navigate(routeNames.SignpostScreen);
						this.props.disconnectDevice(this.props.device);
					}
				},
			],
			{ cancelable: false }
		)
	}
}

export const SettingsScreen = connect<StateProps, DispatchProps, OwnProps>(
	(state: State, _ownProps: OwnProps) => {
		return {
			device: state.device.devices[state.device.activeDeviceIndex],
		}
	},
	(dispatch: Dispatch) => ({
		reinitialize: () => {
			dispatch(BreathingReinitializeAction());
		},
		disconnectDevice: (device: Device) => {
			dispatch(DeviceConnectionRemoveAction(device));
		}
	}),
)(SettingsScreenHOC);
