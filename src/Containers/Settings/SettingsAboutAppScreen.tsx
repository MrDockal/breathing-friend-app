import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { TextNormal } from '../../Components/Text/TextNormal';
import { HeaderlessView } from '../../Components/HeaderlessView/HeaderlessView';
import { H1 } from '../../Components/Text/H1';
import { BackgroundGradient } from '../../Components/BackgroundGradient/BackgroundGradient';
import { i18n } from '../../Core/i18n/i18n';

export class SettingsAboutAppScreen extends React.Component {

	static navigationOptions = ({ navigation }: NavigationScreenProps<{}>) => ({
		headerTitle: <TextNormal>{i18n.t('about_app')}</TextNormal>,
		headerTransparent: true,
		headerTintColor: 'white',
	});

	public render() {
		return (
			<BackgroundGradient theme={'black'}>
				<HeaderlessView>
					<H1>{i18n.t('about_app_text')}</H1>
				</HeaderlessView>
			</BackgroundGradient>
		);
	}
}
