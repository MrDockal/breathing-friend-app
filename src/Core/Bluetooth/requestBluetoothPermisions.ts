import {
	Platform,
	PermissionsAndroid
} from 'react-native';

export const requestBluetoothPermisions = async () => {
	if (Platform.OS === 'android' && Platform.Version >= 23) {
		const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
		if (!granted) {
			const grantedAfterRequest = await PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
			if (!grantedAfterRequest) {
				alert('Sorry you have to grant permissions in order to connect your device!');
			}
		}
    }
}
