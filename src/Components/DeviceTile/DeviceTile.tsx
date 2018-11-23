import * as React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TextNormal } from '../Text/TextNormal';
const whiteBfImage = require('../../assets/white-bf.png');

const styles = StyleSheet.create({
	wrapper: {
		paddingVertical: 20,
	},
	bfImage: {
		alignSelf: 'center',
		height: 125,
		width: 150,
	},
});

export interface DeviceTileProps {
	name: string;
}

export class DeviceTile extends React.Component<DeviceTileProps> {
	public render() {
		return (
			<View style={styles.wrapper}>
				<Image source={whiteBfImage} style={styles.bfImage} resizeMode={'cover'} />
				<TextNormal bold={true}>{this.props.name}</TextNormal>
			</View>
		);
	}
}