import * as React from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { BackgroundGradient } from '../../Components/BackgroundGradient/BackgroundGradient';
import { Button } from '../../Components/Button/Button';
import { H1 } from '../../Components/Text/H1';
import { TextNormal } from '../../Components/Text/TextNormal';
import { NavigationInjectedProps } from 'react-navigation';
import { routeNames } from '../../Navigators/Navigators';
import { i18n } from '../../Core/i18n/i18n';
const successImage = require('../../assets/success.png')

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 40,
	},
	image: {
		width: 180,
		height: 180,
	},
	contentWrapper: {
		flex: 9/14,
		justifyContent: 'space-between',
		alignItems: 'center',
		textAlign: 'center',
	},
	buttonWrapper: {
		alignItems: 'flex-start',
		textAlign: 'center',
	}
});

export interface SuccessDeviceScreenPropsNavigationParams {
	deviceName: string;
}

export type SuccessDeviceScreenProps = NavigationInjectedProps<SuccessDeviceScreenPropsNavigationParams>;

export class SuccessDeviceScreen extends React.Component<SuccessDeviceScreenProps> {

	public componentDidMount() {
		this.props.navigation.addListener('willBlur', () => {
			this.props.navigation.navigate(routeNames.SignpostScreen);
		});
	}

	public render() {
		return (
			<BackgroundGradient theme={'black'}>
				<View style={styles.wrapper}>
					<View style={styles.contentWrapper}>
						<Image source={successImage} resizeMode={'cover'} style={styles.image} />
						<H1>{i18n.t('congratulations')}!</H1>
						<TextNormal>{i18n.t('your_device_name')}{this.props.navigation.state.params!.deviceName}. Jméno si můžete později změnit v aplikaci.</TextNormal>
					</View>
					<View style={styles.buttonWrapper}>
						<Button theme={'black'} title={i18n.t('lets_go')} onPress={() => this.props.navigation.navigate(routeNames.SignpostScreen)} />
					</View>
				</View>
			</BackgroundGradient>
		)
	}
}
