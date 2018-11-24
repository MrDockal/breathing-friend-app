import * as React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { BackgroundGradient } from '../BackgroundGradient';
import { Device } from '../../Core/Entities/Device';
import { TextNormal } from '../Text/TextNormal';
import { TextSmall } from '../Text/TextSmall';
import { BluetoothIcon } from '../BluetoothIcon/BluetoothIcon';
const whiteBfImage = require('../../assets/white-bf.png');

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
	},
	bfImage: {
		alignSelf: 'center',
		height: 250,
		width: 300,
	},
	headerText: {
		alignSelf: 'flex-end',
		paddingHorizontal: 20
	},
	textWithIconWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
	}
});

export interface SignPostProps {
	initializeDevice: (device: Device) => void;
	syncNewDevice: () => void;
	devices: Device[];
}

export class SignPost extends React.Component<SignPostProps> {
	public render() {
		return (
			<BackgroundGradient theme={'red'}>
				<View style={styles.wrapper}>
					<View style={styles.headerText}>
						<TouchableOpacity activeOpacity={0.6} onPress={() => this.props.syncNewDevice()}>
							<TextSmall underline={true}>Přidat nové</TextSmall>
						</TouchableOpacity>
					</View>
					<View>
						{
							this.props.devices.map((device: Device, index: number) => (
								<TouchableOpacity activeOpacity={1} key={index} onPress={() => this.props.initializeDevice(device)}>
									<Image source={whiteBfImage} style={styles.bfImage} resizeMode={'cover'} />
									<View style={styles.textWithIconWrapper}>
										<TextNormal bold={true}>{device.name}</TextNormal><BluetoothIcon connected={device.connected}/>
									</View>
								</TouchableOpacity>
							))
						}
					</View>
					<View/>
				</View>
			</BackgroundGradient>
		);
	}
}
