import { BleAdapter } from "../../Core/Bluetooth/createBleAdapter";
import { put, takeEvery } from 'redux-saga/effects';
import { ScanForAvailablePeripherals, availablePeripheralObtainedAction, peripheralScanStoppedAction } from "../Actions/deviceActions";

export function* deviceSaga (bleAdapter: BleAdapter) {
	return [
		yield takeEvery(ScanForAvailablePeripherals, function* (_action: ScanForAvailablePeripherals) {
			yield bleAdapter.init(); //TODO may be moved to separate action flow
			const discoveredPeripheralCb = function* (peripheral: any) {
				yield put(availablePeripheralObtainedAction(peripheral));
			}
			const doneCb = function* () {
				yield put(peripheralScanStoppedAction());
			}
			bleAdapter.scanForPeripherals([], discoveredPeripheralCb, doneCb);
		}),
	];
}