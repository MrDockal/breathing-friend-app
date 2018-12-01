import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../Store/configureStore';
import { RenameDeviceView } from '../../Components/RenameDeviceView/RenameDeviceView';
import { Dispatch } from 'redux';
import { deviceSetNameAction } from '../../Store/Actions/Device/deviceActions';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import { TextNormal } from '../../Components/Text/TextNormal';
import { i18n } from '../../Core/i18n/i18n';

interface StateProps {
	deviceName: string;
	deviceUid: string;
}

interface DispatchProps {
	setName: (uid: string, name: string) => void;
}

export type SettingsRenameDeviceNameScreenProps = StateProps & DispatchProps & NavigationInjectedProps<{}>;;

class SettingsRenameDeviceNameScreenHOC extends React.Component<SettingsRenameDeviceNameScreenProps> {

	static navigationOptions = ({ navigation }: NavigationScreenProps<{}>) => ({
		headerTitle: <TextNormal>{i18n.t('rename')}</TextNormal>,
		headerTransparent: true,
		headerTintColor: 'white',
	});
	
	public render() {
		return (
			<RenameDeviceView
				name={this.props.deviceName}
				submit={this.setName}
			/>
		)
	}

	private setName = (newName: string) => {
		this.props.setName(this.props.deviceUid, newName);
		this.props.navigation.goBack();
	}
}

export const SettingsRenameDeviceNameScreen = connect<StateProps, DispatchProps>(
	(state: State) => ({
		deviceName: state.device.devices[state.device.activeDeviceIndex].name,
		deviceUid: state.device.devices[state.device.activeDeviceIndex].uid,
	}),
	(dispatch: Dispatch) => ({
		setName: (uid: string, name: string) => dispatch(deviceSetNameAction(uid, name))
	})
)(SettingsRenameDeviceNameScreenHOC);
