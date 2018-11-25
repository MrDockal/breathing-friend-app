import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { TextNormal } from '../../Components/Text/TextNormal';

export class SettingsReportBugScreen extends React.Component {

	static navigationOptions = ({ navigation }: NavigationScreenProps<{}>) => ({
		headerTitle: <TextNormal>Nahlásit chybu</TextNormal>,
		headerTransparent: true,
		headerTintColor: 'white',
	});
	
	public render() {
		return (
			<View>
				<Text>Report bug</Text>
			</View>
		);
	}
}
