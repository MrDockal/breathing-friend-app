import BLEManager, { BleManagerDiscoverPeripheralResponse, BondedPeripheral, BleManagerDidUpdateValueForCharacteristicResponse } from 'react-native-ble-manager';
import {
	NativeEventEmitter,
	NativeModules,
  } from 'react-native';
import { requestBluetoothPermisions } from './requestBluetoothPermisions';
import { Buffer } from 'buffer';
import { parseBluetoothMessage } from '../Helpers/parseBluetoothMessage';

export class AndroidBleAdapter {

	private readonly nativeEmitter: NativeEventEmitter;
	public readonly BLEManager: typeof BLEManager;

	public constructor(private serviceUUIDs: string[], private options?: BLEManager.StartOptions) {
		this.nativeEmitter = new NativeEventEmitter(NativeModules.BleManager);
		this.BLEManager = BLEManager;
	}

	public async init() {
		await BLEManager.start(this.options);
		await requestBluetoothPermisions();
	}

	public async scanPeripherals(scanDuration: number, discoveredPeripheral: (peripheral: BleManagerDiscoverPeripheralResponse) => void) {
		return new Promise(async (resolve: (peripherals: BleManagerDiscoverPeripheralResponse[]) => void) => {
			let peripherals: BleManagerDiscoverPeripheralResponse[] = [];
			await BLEManager.scan([], scanDuration, false);
			const listener = (data: BleManagerDiscoverPeripheralResponse) => {
				const found = peripherals.findIndex((peripheral: BleManagerDiscoverPeripheralResponse) => peripheral.id === data.id);
				const isValid = data.advertising.serviceUUIDs.sort().join('').toLowerCase() === this.serviceUUIDs.sort().join('').toLowerCase()
				if (found === -1 && isValid) {
					peripherals.push(data);
					discoveredPeripheral(data);
				}
			};
			const doneListener = () => {
				this.nativeEmitter.removeListener('BleManagerStopScan', doneListener);
				this.nativeEmitter.removeListener('BleManagerDiscoverPeripheral', listener);
				resolve(peripherals);
			}
			this.nativeEmitter.addListener('BleManagerDiscoverPeripheral', listener);
			this.nativeEmitter.addListener('BleManagerStopScan', doneListener);
		});
	}

	private async getBondedPeripherals() {
		const peripherals = await BLEManager.getBondedPeripherals([]);
		//return peripherals.filter((peripheral: BondedPeripheral) => peripheral.)
	}

	public async read(peripheralId: string, serviceUUID: string, characteristicUUID: string) {
		const data = await BLEManager.read(peripheralId, serviceUUID, characteristicUUID);
		return parseBluetoothMessage(data);
	}

	public async write(peripheralId: string, serviceUUID: string, characteristicUUID: string, data: any, maxByteSize?: number) {
		let strData;
		try {
			strData = JSON.parse(data);
		} catch(e) {
			strData = '{}';
		}
		const buffer = Buffer.from(strData, 'utf8');
		let myBuffer = [];
		for (var i = 0; i < buffer.length; i++) {
			myBuffer.push(buffer[i]);
		}
		return await this.BLEManager.write(peripheralId, serviceUUID, characteristicUUID, myBuffer, maxByteSize);
	}

	public async startNotification(peripheralId: string, serviceUUID: string, characteristicUUID: string) {
		return await this.BLEManager.startNotification(peripheralId, serviceUUID, characteristicUUID);
	}

	public onNewNotificationListener(cb: (data: BleManagerDidUpdateValueForCharacteristicResponse) => void) {
		this.nativeEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', cb);
	}

	public removeNotificationListener(cb: (data: BleManagerDidUpdateValueForCharacteristicResponse) => void) {
		this.nativeEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', cb);
	}
}