declare module 'react-native-ble-manager' {
	interface StartOptions {
		showAlert?: boolean;
		restoreIdentifierKey?: string;
		forceLegacy?: string;
	}
	function start(options?: StartOptions): Promise<void>;

	interface ScanningOptions {
		numberOfMatches?: number;
		matchMode?: number;
		scanMode?: number;
	}
	function scan(serviceUUIDs: string[], seconds: number, allowDuplicates: boolean, scanningOptions?: ScanningOptions): Promise<void>;

	function stopScan(): Promise<void>;

	function connect(peripheralId: string): Promise<void>;
	
	function disconnect(peripheralId: string): Promise<void>;

	function enableBluetooth(): Promise<void>;

	function checkState(): void;

	function startNotification(peripheralId: string, serviceUUID: string, characteristicUUID: string): Promise<void>;

	function stopNotification(peripheralId: string, serviceUUID: string, characteristicUUID: string): Promise<void>;

	function read(peripheralId: string, serviceUUID: string, characteristicUUID: string): Promise<ArrayBuffer>;

	function write(peripheralId: string, serviceUUID: string, characteristicUUID: string, data: Int8Array, maxByteSize: number): Promise<void>; 

	function writeWithoutResponse(peripheralId: string, serviceUUID: string, characteristicUUID: string, data: Int8Array, maxByteSize: number, queueSleepTime: number): Promise<void>;

	type RSSI = any; //TODO need to be explored
	function readRSSI(peripheralId: string): Promise<RSSI>;
	
	enum ConnectionPriority {
		BALANCED = 0,
		HIGH = 1,
		LOW = 2,
	}
	function requestConnectionPriority(peripheralId: string, connectionPriority: ConnectionPriority): Promise<void>;

	function requestMTU(peripheralId: string, mtu: number): Promise<number>;

	interface PeripheralInfo {
		//TODO
	}
	function retrieveServices(peripheralId: string, serviceUUIDs: string[]): Promise<PeripheralInfo>;
	function refreshCache(peripheralId: string): Promise<PeripheralInfo>;

	interface ConnectedPeripheral {

	}
	function getConnectedPeripherals(serviceUUIDs: string[]): Promise<ConnectedPeripheral[]>;

	function createBond(peripheralId: string): Promise<void>;

	interface BondedPeripheral {
		rssi: number;
		id: string;
		name: string;
	}
	function getBondedPeripherals(emptyArray: any[]): Promise<BondedPeripheral[]>;

	function getDiscoveredPeripherals(emptyArray: any[]): Promise<ConnectedPeripheral[]>;

	function removePeripheral(peripheralId: string): Promise<void>;

	function isPeripheralConnected(peripheralId: string, serviceUUIDs: string[]): Promiseb<boolean>;

	interface BleManagerDidUpdateState {
		state: 'on' | 'off';
	}
	interface ManufacturerData {
		bytes: Int8Array;
		data: string;
	}
	interface AdvertisingIOS {
		kCBAdvDataChannel: Int8Array;
		kCBAdvDataIsConnectable: string;
		kCBAdvDataLocalName: string;
		kCBAdvDataManufacturerData: ManufacturerData;
	}
	interface AdvertisingAndroid {
		isConnectable: boolean;
		localName: string;
		manufacturerData: ManufacturerData;
		txPowerLevel: number;
	}
	interface BleManagerDiscoverPeripheralResponse {
		id: string;
		name: string;
		rssi: string;
		advertising: ManufacturerData | AdvertisingIOS;
	}
	interface BleManagerDidUpdateValueForCharacteristicResponse {
		value: any[];
		peripheral: string;
		characteristic: string;
		service: string;
	}
	interface BleManagerConnectPeripheralResponse {
		peripheral: string;
	}
	interface BleManagerDisconnectPeripheralResponse {
		peripheral: string;
	}
}
