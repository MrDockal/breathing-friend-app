import React from 'react';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { SyncButton } from '../Components/SyncButton';
import { connect } from 'react-redux';
import { State } from '../Store/configureStore';
import { Dispatch } from 'redux';
import { scanForAvailablePeripheralsAction, stopScanForAvailablePeripheralsAction, peripheralBondStartAction, peripheralRemoveBondAction } from '../Store/Actions/deviceActions';
import { BleManagerDiscoverPeripheralResponse } from 'react-native-ble-manager';
import { AppList } from '../Components/AppList';
import { themeSchema } from '../Core/ThemeSchema/themeSchema';
import { ScanForPeripheralResponse } from '../Core/Bluetooth/createBleAdapter';
import { Icon } from 'react-native-elements';
import { Alert } from 'react-native';

const syncrhonizeDeviceScreensStyles = StyleSheet.create({
	wrapper: {
		flexGrow: 1,
		paddingTop: 20,
	}
});

interface NavigationParams {
	scan: () => void;
	scanning: boolean;
}

interface StateProps {
	scanning: boolean;
	scannedPeripherals: ScanForPeripheralResponse[];
}

interface DispatchProps {
	scan: () => void;
	stopScan: () => void;
	bond: (peripheral: BleManagerDiscoverPeripheralResponse) => void;
	unbond: (peripheral: BleManagerDiscoverPeripheralResponse) => void;
}

interface OwnProps extends NavigationInjectedProps<NavigationParams> {

}

type Props = OwnProps & DispatchProps & StateProps;

export class SynchronizeDeviceScreenHOC extends React.Component<Props, {}> {
	
	public constructor(props: Props) {
		super(props);
	}

	static navigationOptions = ({navigation}: NavigationScreenProps<NavigationParams>) => ({
		title: 'Synchronize devices',
		headerRight: <SyncButton
						scanning={navigation.state.params && navigation.state.params.scanning}
						scan={navigation.state.params ? navigation.state.params.scan : () => false}
					/>,
	});

	public componentDidMount() {
		this.props.navigation.addListener('didBlur', () => this.props.stopScan());
		this.props.navigation.setParams({
			scan: () => this.props.scan(),
			scanning: this.props.scanning,
		});
		this.props.scan();
	}

	public componentDidUpdate() {
		if (this.props.scanning === this.props.navigation.state.params.scanning) {
			return;
		}
		this.props.navigation.setParams({
			scanning: this.props.scanning,
		});
	}

	public render() {
		const bondedDevices = this.getBondedDevices();
		const newDevices = this.getNewDevices();
		return (
			<ScrollView contentContainerStyle={syncrhonizeDeviceScreensStyles.wrapper}>
				{
					newDevices.length > 0 &&
					<React.Fragment>
						<Text style={{fontSize: themeSchema.fontSize.normal, paddingLeft: 20}}>Found Devices</Text>
						<AppList list={newDevices}/>
					</React.Fragment>
				}
				{
					bondedDevices.length > 0 &&
					<React.Fragment>
						<Text style={{fontSize: themeSchema.fontSize.normal, paddingLeft: 20}}>Connected Devices</Text>
						<AppList list={bondedDevices}/>
					</React.Fragment>
				}
			</ScrollView>
		);
	}

	private getBondedDevices() {
		const bondedDevices = this.props.scannedPeripherals.filter((device: ScanForPeripheralResponse) => device.bonded);
		return bondedDevices.map((device: ScanForPeripheralResponse) => ({
			title: `${device.peripheral.id} - ${device.peripheral.name}`,
			rightIcon: <Icon name='cross' type='entypo'/>,
			onPress: () => {
				Alert.alert(
					'Unlink device',
					'This action will remove connection between your phone and breathing device',
					[
						{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
						{ text: 'Unlink', onPress: () => this.props.unbond(device.peripheral) },
					],
					{ cancelable: true }
				);
			},
		}));
	}

	private getNewDevices() {
		const newDevices = this.props.scannedPeripherals.filter((device: ScanForPeripheralResponse) => !device.bonded);
		return newDevices.map((device: ScanForPeripheralResponse) => ({
			title: `${device.peripheral.id} - ${device.peripheral.name}`,
			onPress: () => {
				this.props.bond(device.peripheral);
			},
		}));
	}
}

export const SynchronizeDeviceScreen = connect<StateProps, DispatchProps, OwnProps>(
	(state: State) => ({
		scanning: state.device.scanning,
		scannedPeripherals: state.device.scannedPeripherals,
	}),
	(dispatch: Dispatch) => ({
		scan: () => (
			dispatch(scanForAvailablePeripheralsAction())
		),
		stopScan: () => (
			dispatch(stopScanForAvailablePeripheralsAction())
		),
		bond: (peripheral: BleManagerDiscoverPeripheralResponse) => (
			dispatch(peripheralBondStartAction(peripheral))
		),
		unbond: (peripheral: BleManagerDiscoverPeripheralResponse) => (
			dispatch(peripheralRemoveBondAction(peripheral))
		),
	}),
)(SynchronizeDeviceScreenHOC);
