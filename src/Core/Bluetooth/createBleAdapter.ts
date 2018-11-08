import BLEManger from 'react-native-ble-manager';
import {
	NativeEventEmitter,
	NativeModules,
  } from 'react-native';
import { requestBluetoothPermisions } from './requestBluetoothPermisions';
import { DeviceBreathingMode } from '../Entities/Device';

const BleManagerModule = NativeModules.BleManager;

export interface BleAdapter {
	BLEManger: typeof BLEManger;
	init: () => void;
	scanForPeripherals: (discoveredPeripheral: (peripheral: any) => void, done: () => void) => void;
	syncBreathingModes: (peripheralUid: string) => Promise<DeviceBreathingMode[]>;
	getPeripherals: () => Promise<any>;
}

export const createBleAdapter = (serviceUUIDs: string[], options?: BLEManger.StartOptions): BleAdapter => {
	const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
	bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', (data: any) => console.log('BleManagerDiscoverPeripheral', data));
	bleManagerEmitter.addListener('BleManagerStopScan', (data: any) => console.log('BleManagerStopScan', data));
	bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', (data: any) => console.log('BleManagerDisconnectPeripheral', data));
	bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', (data: any) => console.log('BleManagerDidUpdateValueForCharacteristic', data));
	
	return {
		BLEManger,
		init: async() => {
			await BLEManger.start(options);
			await requestBluetoothPermisions();
		},
		scanForPeripherals: async (discoveredPeripheral: (peripheral: any) => void, done: () => void) => {
			let peripherals: any[] = [];
			await BLEManger.scan(serviceUUIDs, 10, false);
			const listener = (data: any) => {
				peripherals.push(data);
				discoveredPeripheral(data);
			};
			const doneListener = () => {
				bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', listener);
				done();
			}
			bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', listener);
			bleManagerEmitter.once('BleManagerStopScan', doneListener, this);
		},
		syncBreathingModes: async(peripheralUid: string) => {
			//TODO get brathing modes
			return [{
				speed: 'normal',
				uid: '123'
			}]
		},
		getPeripherals: async() => {
			const [connected, bonded] = await Promise.all([BLEManger.getConnectedPeripherals(serviceUUIDs), BLEManger.getBondedPeripherals(serviceUUIDs)]);
			return {
				connected,
				bonded,
			}
		}
	}
}
