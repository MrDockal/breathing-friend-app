import {
	Platform,
	PermissionsAndroid
} from 'react-native';
import { BluetoothStatus } from 'react-native-bluetooth-status';

export const requestBluetoothPermisions = async () => {
	if (Platform.OS === 'android' && Platform.Version >= 23) {
		const enabled = await BluetoothStatus.state();
		if (!enabled) {
			try {
				BluetoothStatus.enable(true);
			} catch(e) {
				console.log(e);
			}
		}
		const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
		if (!granted) {
			const grantedAfterRequest = await PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
			if (!grantedAfterRequest) {
				alert('Sorry you have to grant permissions in order to connect your device!');
			}
		}
    }
}
