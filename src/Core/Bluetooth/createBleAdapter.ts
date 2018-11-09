import BLEManger, { BleManagerDiscoverPeripheralResponse, BondedPeripheral } from 'react-native-ble-manager';
import {
	NativeEventEmitter,
	NativeModules,
  } from 'react-native';
import { requestBluetoothPermisions } from './requestBluetoothPermisions';
import { DeviceBreathingMode } from '../Entities/Device';

const BleManagerModule = NativeModules.BleManager;

export interface ScanForPeripheralResponse {
	bonded: boolean,
	peripheral: BleManagerDiscoverPeripheralResponse,
}

export interface BleAdapter {
	BLEManger: typeof BLEManger;
	init: () => Promise<void>;
	scanForPeripherals: (discoveredPeripheral: (peripheral: ScanForPeripheralResponse) => void, done: () => void) => Promise<void>;
	syncBreathingModes: (peripheralUid: string) => Promise<DeviceBreathingMode[]>;
	getPeripherals: () => Promise<any>;
}

export const createBleAdapter = (serviceUUIDs: string[], options?: BLEManger.StartOptions): BleAdapter => {
	const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
	//bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', (data: any) => console.log('BleManagerDiscoverPeripheral', data));
	//bleManagerEmitter.addListener('BleManagerStopScan', (data: any) => console.log('BleManagerStopScan', data));
	//bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', (data: any) => console.log('BleManagerDisconnectPeripheral', data));
	//bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', (data: any) => console.log('BleManagerDidUpdateValueForCharacteristic', data));
	
	return {
		BLEManger,
		init: async() => {
			await BLEManger.start(options);
			await requestBluetoothPermisions();
		},
		scanForPeripherals: (discoveredPeripheral: (peripheral: ScanForPeripheralResponse) => void, done: () => void) => {
			return new Promise(async (resolve: () => void) => {
				const bonded = await BLEManger.getBondedPeripherals(serviceUUIDs);
				let peripherals: any[] = [];
				await BLEManger.scan([], 10, false);
				const listener = (data: BleManagerDiscoverPeripheralResponse) => {
					const found = peripherals.findIndex((peripheral: BleManagerDiscoverPeripheralResponse) => peripheral.id === data.id);
					const isBonded = bonded.findIndex((peripheral: BondedPeripheral) => peripheral.id === data.id) > -1;
					const isValid = data.advertising.serviceUUIDs.sort().join('') === serviceUUIDs.sort().join('');
					if (found === -1 && isValid) {
						peripherals.push(data);
						discoveredPeripheral({
							bonded: isBonded,
							peripheral: data
						});
					}
				};
				const doneListener = () => {
					bleManagerEmitter.removeListener('BleManagerStopScan', doneListener);
					bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', listener);
					done();
					resolve();
				}
				bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', listener);
				bleManagerEmitter.addListener('BleManagerStopScan', doneListener);
			});
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
