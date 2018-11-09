import React from 'react';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import {ScrollView, Text, StyleSheet} from 'react-native';
import { SyncButton } from '../Components/SyncButton';
import { connect } from 'react-redux';
import { State } from '../Store/configureStore';
import { Dispatch } from 'redux';
import { scanForAvailablePeripheralsAction, stopScanForAvailablePeripheralsAction } from '../Store/Actions/deviceActions';
import { BleManagerDiscoverPeripheralResponse } from 'react-native-ble-manager';

const syncrhonizeDeviceScreensStyles = StyleSheet.create({
	wrapper: {
		flexGrow: 1,
		alignItems: 'center',
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
		title: 'Ahoj',
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
		return (
			<ScrollView contentContainerStyle={syncrhonizeDeviceScreensStyles.wrapper}>
				{this.props.scannedPeripherals.map((peripheral: BleManagerDiscoverPeripheralResponse, index: number) => (
					<Text key={index}>{peripheral.id} - {peripheral.name}</Text>
				))}
			</ScrollView>
		);
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
		)
	}),
)(SynchronizeDeviceScreenHOC);
