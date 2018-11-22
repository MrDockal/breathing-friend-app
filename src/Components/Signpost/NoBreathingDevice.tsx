import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { BackgroundGradient } from '../BackgroundGradient';
import { H1 } from '../Text/H1';
import { TextNormal } from '../Text/TextNormal';
import { Button } from '../Button';

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		textAlign: 'center',
		padding: 40,
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
					<View>
						<TextNormal>Breathing pictogram</TextNormal>
					</View>
					<H1 bold={true}>Vítejte!</H1>
					<TextNormal>ujistěte se, že je vaše dýchátko zapnuté, a pokračujte podle kroků v aplikaci</TextNormal>
					<Button
						theme={'black'}
						onPress={() => this.props.syncNewDevice()}
						title="Sync new device"
					/>
				</View>
			</BackgroundGradient>
		);
	}
}