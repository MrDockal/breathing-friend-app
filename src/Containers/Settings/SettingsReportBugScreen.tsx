import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { TextNormal } from '../../Components/Text/TextNormal';
import { BackgroundGradient } from '../../Components/BackgroundGradient/BackgroundGradient';
import { H1 } from '../../Components/Text/H1';
import { HeaderlessView } from '../../Components/HeaderlessView/HeaderlessView';

export class SettingsReportBugScreen extends React.Component {

	static navigationOptions = ({ navigation }: NavigationScreenProps<{}>) => ({
		headerTitle: <TextNormal>Nahlásit chybu</TextNormal>,
		headerTransparent: true,
		headerTintColor: 'white',
	});
	
	public render() {
		return (
			<BackgroundGradient theme={'black'}>
				<HeaderlessView>
					<H1>About app</H1>
				</HeaderlessView>
			</BackgroundGradient>
		);
	}
}
