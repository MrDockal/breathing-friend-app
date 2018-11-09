import { BleAdapter } from "../../Core/Bluetooth/createBleAdapter";
import { takeEvery, put } from 'redux-saga/effects';
import { ScanForAvailablePeripherals, availablePeripheralObtainedAction, peripheralScanStoppedAction, StopScanForAvailablePeripherals } from "../Actions/deviceActions";
import { Dispatch } from "redux";
import { BleManagerDiscoverPeripheralResponse } from "react-native-ble-manager";

export function* deviceSaga (bleAdapter: BleAdapter, dispatch: Dispatch) {
	return [
		yield takeEvery(ScanForAvailablePeripherals, function* (_action: ScanForAvailablePeripherals) {
			const discoveredPeripheralCb = (peripheral: BleManagerDiscoverPeripheralResponse) => {
				dispatch(availablePeripheralObtainedAction(peripheral));
			}
			const doneCb = () => {
				dispatch(peripheralScanStoppedAction());
			}
			yield bleAdapter.scanForPeripherals(discoveredPeripheralCb, doneCb);
		}),
		yield takeEvery(StopScanForAvailablePeripherals, function* (_action: StopScanForAvailablePeripherals) {
			yield bleAdapter.BLEManger.stopScan();
			yield put(peripheralScanStoppedAction());
		}),
	];
}
