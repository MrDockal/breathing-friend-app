import React from 'react';
import { connect } from 'react-redux';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import { State as AppState } from '../Store/configureStore';
import { ScrollView, View, Text, StyleSheet, TextInput } from 'react-native';
import { Dispatch } from 'redux';
import { themeSchema } from '../Core/ThemeSchema/themeSchema';
import { BleManagerDiscoverPeripheralResponse } from 'react-native-ble-manager';
import * as faker from 'faker';
import { Button } from '../Components/Button';
import { peripheralBondStartAction } from '../Store/Actions/Device/devicesBondActions';
import { deviceSetNameAction } from '../Store/Actions/Device/deviceActions';
import { routeNames } from '../Navigators/Navigators';
import { TextNormal } from '../Components/Text/TextNormal';
import { BackgroundGradient } from '../Components/BackgroundGradient';
import { SuccessDeviceScreenPropsNavigationParams } from './SuccessDeviceScreen';

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

const renameDeviceScreenStyles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		textAlign: 'center',
		padding: 40,
	},
	input: {
		borderBottomWidth: 1,
		borderBottomColor: themeSchema.color.green,
		color: themeSchema.color.green,
		width: '90%',
		fontSize: themeSchema.fontSize.normal,
		textAlign: 'center'
	}
});

class RenameDeviceScreenHOC extends React.Component<Props, State> {

	static navigationOptions = ({ navigation }: NavigationScreenProps<NavigationParams>) => ({
		headerTitle: <TextNormal>Přejmenovat</TextNormal>,
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
			<BackgroundGradient theme={'black'}>
				<ScrollView contentContainerStyle={renameDeviceScreenStyles.wrapper}>
					<View />
					<TextInput
						style={renameDeviceScreenStyles.input}
						onChangeText={this.onNameChange}
						value={this.state.name}
					/>
					<Button theme={'black'} title={'Pokračovat'} onPress={this.submit} />
				</ScrollView>
			</BackgroundGradient>
		);
	}

	public submit = () => {
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
