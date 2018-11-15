
type BluetoothStatus = {
	state: () => Promise<boolean>;
	enable: (bool: boolean) => void; 
};

declare module 'react-native-bluetooth-status' {
	export const BluetoothStatus: BluetoothStatus;
}
