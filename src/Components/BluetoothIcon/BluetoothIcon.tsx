import * as React from 'react';
import { Icon } from 'react-native-elements';

export interface BluetoothIconProps {
	connected: boolean;
	color?: string;
}

export class BluetoothIcon extends React.Component<BluetoothIconProps> {
	public render() {
		const color = this.props.color ? this.props.color : 'white';
		const iconName = this.props.connected ? 'bluetooth' : 'bluetooth-disabled'
		return (
			<Icon
				type='material'
				name={iconName}
				color={color}
				size={30}
				underlayColor="rgba(255,255,255,0)"
			/>
		)
	}
}
