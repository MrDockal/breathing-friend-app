import BLEManager, { BleManagerDiscoverPeripheralResponse, BondedPeripheral, BleManagerDidUpdateValueForCharacteristicResponse, BleManagerConnectPeripheralResponse, BleManagerDisconnectPeripheralResponse } from 'react-native-ble-manager';
import {
	NativeEventEmitter,
	NativeModules,
} from 'react-native';
import { requestBluetoothPermisions, restartBluetoothAdapter } from './requestBluetoothPermisions';
import { parseBluetoothMessage } from '../Helpers/parseBluetoothMessage';
import { stringToArrayBuffer } from '../Helpers/string-converter';

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
			strData = JSON.stringify(data);
		} catch (e) {
			strData = '{}';
		}
		const myBuffer = stringToArrayBuffer(strData);
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

	public onPeripheralConnected(cb: (data: BleManagerConnectPeripheralResponse) => void) {
		this.nativeEmitter.addListener('BleManagerConnectPeripheral', cb);
	};

	public removeOnPeripheralConnected(cb: (data: BleManagerConnectPeripheralResponse) => void) {
		this.nativeEmitter.removeListener('BleManagerConnectPeripheral', cb);
	};

	public onPeripheralDisconnected(cb: (data: BleManagerDisconnectPeripheralResponse) => void) {
		this.nativeEmitter.addListener('BleManagerDisconnectPeripheral', cb);
	};

	public removeOnPeripheralDisconnected(cb: (data: BleManagerDisconnectPeripheralResponse) => void) {
		this.nativeEmitter.removeListener('BleManagerDisconnectPeripheral', cb);
	};

	public removeAllPeripheralConnectionListeners() {
		this.nativeEmitter.removeAllListeners('BleManagerDisconnectPeripheral');
		this.nativeEmitter.removeAllListeners('BleManagerConnectPeripheral');
	}
}