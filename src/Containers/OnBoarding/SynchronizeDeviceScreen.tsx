import React from 'react';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import { ScrollView, StyleSheet } from 'react-native';
import { SyncButton } from '../../Components/SyncButton/SyncButton';
import { connect } from 'react-redux';
import { State } from '../../Store/configureStore';
import { Dispatch } from 'redux';
import { BleManagerDiscoverPeripheralResponse } from 'react-native-ble-manager';
import { scanForAvailablePeripheralsAction, stopScanForAvailablePeripheralsAction } from '../../Store/Actions/Device/deviceScanActions';
import { routeNames } from '../../Navigators/Navigators';
import { BackgroundGradient } from '../../Components/BackgroundGradient/BackgroundGradient';
import { TextNormal } from '../../Components/Text/TextNormal';
import { List } from '../../Components/List/List';
import { Ripple } from '../../Components/List/ListItem';
import { HeaderlessView } from '../../Components/HeaderlessView/HeaderlessView';
import { i18n } from '../../Core/i18n/i18n';
import { Hr } from '../../Components/Hr/Hr';

const syncrhonizeDeviceScreensStyles = StyleSheet.create({
	wrapper: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
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

	static navigationOptions = ({ navigation }: NavigationScreenProps<NavigationParams>) => ({
		headerTitle: <TextNormal>{i18n.t('sync')}</TextNormal>,
		headerTransparent: true,
		headerTintColor: 'white',
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
			<BackgroundGradient theme={'black'}>
				<HeaderlessView
					contentContainerStyle={syncrhonizeDeviceScreensStyles.wrapper}
				>
					{
						newDevices.length > 0 &&
						<React.Fragment>
							<Hr theme={'black'} />
							<List listItems={newDevices} hideFirstHr={true} />
							<Hr theme={'black'} />
						</React.Fragment>
					}
				</HeaderlessView>
			</BackgroundGradient>
		);
	}

	private getNewDevices() {
		return this.props.scannedPeripherals.map((device: BleManagerDiscoverPeripheralResponse) => ({
			title: `${device.id} - ${device.name}`,
			onPress: () => {
				this.props.navigation.navigate(routeNames.RenameDeviceScreen, { device });
				//this.props.bond(device);
			},
			ripple: 'light' as Ripple,
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
