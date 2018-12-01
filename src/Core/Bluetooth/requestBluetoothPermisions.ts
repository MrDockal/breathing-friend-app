import {
	Platform,
	PermissionsAndroid
} from 'react-native';
import { BluetoothStatus } from 'react-native-bluetooth-status';
import { wait } from '../Helpers/wait';
import { i18n } from '../i18n/i18n';

export const requestBluetoothPermisions = async () => {
	if (Platform.OS === 'android' && Platform.Version >= 23) {
		const enabled = await BluetoothStatus.state();
		if (!enabled) {
			try {
				BluetoothStatus.enable(true);
			} catch (e) {
				console.log(e);
			}
		}
		const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
		if (!granted) {
			const grantedAfterRequest = await PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
			if (!grantedAfterRequest) {
				alert(i18n.t('bluetooth_not_granted'));
			}
		}
	}
}

export const restartBluetoothAdapter = async () => {
	if (Platform.OS === 'android' && Platform.Version >= 23) {
		BluetoothStatus.enable(false);
		await wait(300);
		BluetoothStatus.enable(true);
	}
}