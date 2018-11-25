import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { BackgroundGradient } from '../../Components/BackgroundGradient/BackgroundGradient';
import { Button } from '../../Components/Button/Button';
import { H1 } from '../../Components/Text/H1';
import { TextNormal } from '../../Components/Text/TextNormal';
import { NavigationInjectedProps } from 'react-navigation';
import { routeNames } from '../../Navigators/Navigators';

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		textAlign: 'center',
		padding: 40,
	},
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
				<ScrollView contentContainerStyle={styles.wrapper}>
					<View />
					<View>
						<H1>Gratulujeme!</H1>
						<TextNormal>Vaše dýchátko se jmenuje: {this.props.navigation.state.params!.deviceName}. Jméno si můžete později změnit v aplikaci.</TextNormal>
					</View>
					<Button theme={'black'} title={'Jdeme na to!'} onPress={() => this.props.navigation.navigate(routeNames.SignpostScreen)} />
				</ScrollView>
			</BackgroundGradient>
		)
	}
}
