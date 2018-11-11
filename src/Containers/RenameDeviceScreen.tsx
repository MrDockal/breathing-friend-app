import React from 'react';
import { connect } from 'react-redux';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import { State as AppState } from '../Store/configureStore';
import {ScrollView, Text, StyleSheet} from 'react-native';
import { FormInput } from 'react-native-elements';
import { Dispatch } from 'redux';
import { themeSchema } from '../Core/ThemeSchema/themeSchema';
import { BleManagerDiscoverPeripheralResponse } from 'react-native-ble-manager';
import * as faker from 'faker';

interface StateProps {

}

interface DispatchProps {

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
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: themeSchema.color.backgroundColor,
	}
})

class RenameDeviceScreenHOC extends React.Component<Props, State> {

	static navigationOptions = ({navigation}: NavigationScreenProps<NavigationParams>) => ({
		title: 'Pick a name',
	});

	public constructor(props: Props) {
		super(props);
		this.state = {
			name: faker.name.firstName()
		}
	}
	
	public render() {
		return (
			<ScrollView contentContainerStyle={renameDeviceScreenStyles.wrapper}>
				<FormInput placeholder='BASIC INPUT'/>
				<Text>{this.props.navigation.state.params!.device.id}</Text>
			</ScrollView>
		);
	}
}

export const RenameDeviceScreen = connect<StateProps, DispatchProps, OwnProps>(
	(state: AppState) => ({
		scanning: state.device.scanning,
		scannedPeripherals: state.device.scannedPeripherals,
	}),
	(dispatch: Dispatch) => ({
	}),
)(RenameDeviceScreenHOC);
