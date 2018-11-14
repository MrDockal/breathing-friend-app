import BLEManager, { BleManagerDiscoverPeripheralResponse, BondedPeripheral } from 'react-native-ble-manager';
import {
	NativeEventEmitter,
	NativeModules,
  } from 'react-native';
import { requestBluetoothPermisions } from './requestBluetoothPermisions';
import { Buffer } from 'buffer';

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
				const isValid = data.advertising.serviceUUIDs.sort().join('') === this.serviceUUIDs.sort().join('');
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
		const buffer = Buffer.from(new Uint8Array(data) as any);
		return JSON.parse(buffer.toString('utf8'));
	}
}