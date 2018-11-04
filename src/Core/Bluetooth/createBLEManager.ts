import BLEManger from 'react-native-ble-manager';
import {
	NativeEventEmitter,
	NativeModules,
  } from 'react-native';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export const createBLEManager = async(_options?: BLEManger.StartOptions) => {
	bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', (data: any) => console.log('BleManagerDiscoverPeripheral', data));
	bleManagerEmitter.addListener('BleManagerStopScan', (data: any) => console.log('BleManagerStopScan', data));
	bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', (data: any) => console.log('BleManagerDisconnectPeripheral', data));
	bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', (data: any) => console.log('BleManagerDidUpdateValueForCharacteristic', data));
	await BLEManger.start({showAlert: true});
	return BLEManger;
}

export const exploreDevices = async() => {
	console.log('1Xs');
	const res1 = await BLEManger.scan([], 5, true, {
		scanMode: 2
	});
	console.log('2', res1);
	const peripherals = await BLEManger.getDiscoveredPeripherals([]);
	console.log('3', peripherals);
	const connectedPeripherals = await BLEManger.getConnectedPeripherals([]);
	console.log('4', connectedPeripherals);
	const bonded = await BLEManger.getBondedPeripherals([]);
	console.log('bondeds', bonded);
	return peripherals;
}