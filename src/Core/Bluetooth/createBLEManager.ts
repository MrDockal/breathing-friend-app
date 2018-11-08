import BLEManger from 'react-native-ble-manager';
import {
	NativeEventEmitter,
	NativeModules,
	Platform,
	PermissionsAndroid
  } from 'react-native';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export const createBLEManager = async(_options?: BLEManger.StartOptions) => {
	bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', (data: any) => console.log('BleManagerDiscoverPeripheral', data));
	bleManagerEmitter.addListener('BleManagerStopScan', (data: any) => console.log('BleManagerStopScan', data));
	bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', (data: any) => console.log('BleManagerDisconnectPeripheral', data));
	bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', (data: any) => console.log('BleManagerDidUpdateValueForCharacteristic', data));
	await BLEManger.start({showAlert: false});

    if (Platform.OS === 'android' && Platform.Version >= 23) {
		const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
		if (!granted) {
			const grantedAfterRequest = await PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
			if (!grantedAfterRequest) {
				alert('Sorry you have to grant permissions in order to connect your device!');
			}
		}
    }
	return BLEManger;
}

const wait = (ms: number) => {
	return new Promise((resolve: () => void) => {
		setTimeout(resolve, ms);
	})
}

export const exploreDevices = async() => {
	const res1 = await BLEManger.scan([], 10, false);
	const peripherals = await BLEManger.getDiscoveredPeripherals([]);
	const connectedPeripherals = await BLEManger.getConnectedPeripherals([]);
	const bonded = await BLEManger.getBondedPeripherals([]);
	return peripherals;
}