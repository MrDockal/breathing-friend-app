import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { BackgroundGradient } from '../BackgroundGradient/BackgroundGradient';
import { H1 } from '../Text/H1';
import { Button } from '../Button/Button';
import { TextNormal } from '../Text/TextNormal';
import { i18n } from '../../Core/i18n/i18n';
const turnDeviceOnImage = require('../../assets/turn-device-on.png');

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
		paddingHorizontal: 40,
		paddingBottom: 90,
		paddingTop: 20,
	},
	image: {
		left: -40,
		height: 155,
		width: 300
	},
	textWrapper: {
		flex: 11/14,
		justifyContent: 'space-around',
		alignItems: 'center',
		textAlign: 'center',
	},
	buttonWrapper: {
		alignItems: 'center',
		textAlign: 'center',
	}
});

export interface NoBreathingDeviceProps {
	syncNewDevice: () => void;
}

export class NoBreathingDevice extends React.Component<NoBreathingDeviceProps> {
	public render() {
		return (
			<BackgroundGradient theme={'black'}>
				<View style={styles.wrapper}>
					<View style={styles.textWrapper}>
						<Image source={turnDeviceOnImage} style={styles.image} resizeMode={'cover'} />
						<H1 bold={true}>{i18n.t('welcome')}</H1>
						<TextNormal>{i18n.t('welcome_text')}</TextNormal>
					</View>
					<View style={styles.buttonWrapper}>
						<Button
							theme={'black'}
							onPress={() => this.props.syncNewDevice()}
							title={i18n.t('add_new_device')}
						/>
					</View>
				</View>
			</BackgroundGradient>
		);
	}
}