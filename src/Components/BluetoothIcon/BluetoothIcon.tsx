import * as React from 'react';
import { Icon } from 'react-native-elements';

export interface BluetoothIconProps {
	connected: boolean;
}

export class BluetoothIcon extends React.Component<BluetoothIconProps> {
	public render() {
		const iconName = this.props.connected ? 'bluetooth' : 'bluetooth-disabled'
		return (
			<Icon
				type='material'
				name={iconName}
				color='white'
				size={30}
				underlayColor="rgba(255,255,255,0)"
			/>
		)
	}
}
