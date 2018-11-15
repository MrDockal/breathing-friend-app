import React from 'react';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { SyncButton } from '../Components/SyncButton';
import { connect } from 'react-redux';
import { State } from '../Store/configureStore';
import { Dispatch } from 'redux';
import { BleManagerDiscoverPeripheralResponse } from 'react-native-ble-manager';
import { AppList } from '../Components/AppList';
import { themeSchema } from '../Core/ThemeSchema/themeSchema';
import { peripheralBondStartAction } from '../Store/Actions/Device/devicesBondActions';
import { scanForAvailablePeripheralsAction, stopScanForAvailablePeripheralsAction } from '../Store/Actions/Device/deviceScanActions';
import { routeNames } from '../Navigators/Navigators';

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
	scannedPeripherals: BleManagerDiscoverPeripheralResponse[];
}

interface DispatchProps {
	scan: () => void;
	stopScan: () => void;
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
						scanning={(navigation.state.params && navigation.state.params.scanning) ? true : false}
						scan={navigation.state.params ? navigation.state.params.scan : () => false}
					/>,
	});

	public componentDidMount() {
		this.props.navigation.addListener('didBlur', this.didBlur);
		this.props.navigation.setParams({
			scan: () => this.props.scan(),
			scanning: this.props.scanning,
		});
		this.props.scan();
	}

	public componentDidUpdate() {
		if (this.props.navigation.state.params && this.props.scanning === this.props.navigation.state.params.scanning) {
			return;
		}
		this.props.navigation.setParams({
			scanning: this.props.scanning,
		});
	}

	public render() {
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
			</ScrollView>
		);
	}

	private getNewDevices() {
		return this.props.scannedPeripherals.map((device: BleManagerDiscoverPeripheralResponse) => ({
			title: `${device.id} - ${device.name}`,
			onPress: () => {
				this.props.navigation.navigate(routeNames.RenameDeviceScreen, {device});
				//this.props.bond(device);
			},
		}));
	}

	private didBlur = () => {
		this.props.stopScan();
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
	}),
)(SynchronizeDeviceScreenHOC);
