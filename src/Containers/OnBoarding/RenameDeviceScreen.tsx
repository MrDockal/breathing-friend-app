import React from 'react';
import { connect } from 'react-redux';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import { State as AppState } from '../../Store/configureStore';
import { Dispatch } from 'redux';
import { BleManagerDiscoverPeripheralResponse } from 'react-native-ble-manager';
import * as faker from 'faker';
import { peripheralBondStartAction } from '../../Store/Actions/Device/devicesBondActions';
import { deviceSetNameAction } from '../../Store/Actions/Device/deviceActions';
import { routeNames } from '../../Navigators/Navigators';
import { TextNormal } from '../../Components/Text/TextNormal';
import { SuccessDeviceScreenPropsNavigationParams } from './SuccessDeviceScreen';
import { RenameDeviceView } from '../../Components/RenameDeviceView/RenameDeviceView';
import { i18n } from '../../Core/i18n/i18n';

interface StateProps {
	bonded: boolean;
}

interface DispatchProps {
	bond: (peripheral: BleManagerDiscoverPeripheralResponse) => void;
	setName: (uid: string, name: string) => void;
}

interface OwnProps {

}

interface NavigationParams {
	device: BleManagerDiscoverPeripheralResponse;
}

interface State {
	name: string;
}

type Props = StateProps & DispatchProps & OwnProps & NavigationInjectedProps<NavigationParams>;

class RenameDeviceScreenHOC extends React.Component<Props, State> {

	static navigationOptions = ({ navigation }: NavigationScreenProps<NavigationParams>) => ({
		headerTitle: <TextNormal>{i18n.t('rename')}</TextNormal>,
		headerTransparent: true,
		headerTintColor: 'white',
	});

	static getDerivedStateFromProps = (props: Props, state: State) => {
		if (props.bonded) {
			props.setName(props.navigation.state.params!.device.id, state.name);
			props.navigation.navigate(routeNames.SuccessDeviceScreen, { deviceName: state.name } as SuccessDeviceScreenPropsNavigationParams);
		}
		return state;
	}

	public constructor(props: Props) {
		super(props);
		this.state = {
			name: faker.name.firstName()
		}
	}

	public render() {
		return (
			<RenameDeviceView name={this.state.name} submit={this.submit} />
		);
	}

	public submit = (name: string) => {
		this.onNameChange(name);
		this.props.bond(this.props.navigation.state.params!.device);
	}

	public onNameChange = (text: string) => {
		this.setState({
			name: text,
		});
	}
}

export const RenameDeviceScreen = connect<StateProps, DispatchProps, OwnProps>(
	(state: AppState) => ({
		bonded: (state.device.bond && state.device.bond.bonding && state.device.bond.succeeded) ? true : false,
	}),
	(dispatch: Dispatch) => ({
		bond: (peripheral: BleManagerDiscoverPeripheralResponse) => (
			dispatch(peripheralBondStartAction(peripheral))
		),
		setName: (uid: string, name: string) => {
			dispatch(deviceSetNameAction(uid, name))
		}
	}),
)(RenameDeviceScreenHOC);
