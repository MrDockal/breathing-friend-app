import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { BackgroundGradient } from '../BackgroundGradient';
import { Button } from '../Button';
import { Device } from '../../Core/Entities/Device';

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export interface SignPostProps {
	initializeDevice: (device: Device) => void;
	devices: Device[];
}

export class SignPost extends React.Component<SignPostProps> {
	public render() {
		return (
			<BackgroundGradient theme={'red'}>
				<View style={styles.wrapper}>
					{
						this.props.devices.map((device: Device, index: number) => (
							<Button
								theme={'red'}
								key={index}
								disabled={!device.connected}
								onPress={() => {
									this.props.initializeDevice(device);
								}}
								title={device.name}
							/>
						))
					}
				</View>
			</BackgroundGradient>
		);
	}
}