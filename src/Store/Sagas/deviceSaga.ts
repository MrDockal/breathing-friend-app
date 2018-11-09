import { BleAdapter, ScanForPeripheralResponse } from "../../Core/Bluetooth/createBleAdapter";
import { takeEvery, put } from 'redux-saga/effects';
import { ScanForAvailablePeripherals, availablePeripheralObtainedAction, peripheralScanStoppedAction, StopScanForAvailablePeripherals, PeripheralBondStart, peripheralBondSucceededAction, peripheralBondFailedAction, PeripheralRemoveBond, peripheralBondRemovedAction, peripheralBondRemoveFailedAction } from "../Actions/deviceActions";
import { Dispatch } from "redux";

export function* deviceSaga (bleAdapter: BleAdapter, dispatch: Dispatch) {
	return [
		yield takeEvery(ScanForAvailablePeripherals, function* (_action: ScanForAvailablePeripherals) {
			const discoveredPeripheralCb = (peripheral: ScanForPeripheralResponse) => {
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

		yield takeEvery(PeripheralBondStart, function* (action: PeripheralBondStart) {
			try {
				yield bleAdapter.BLEManger.createBond(action.peripheral.id);
				yield put(peripheralBondSucceededAction(action.peripheral));
				console.log('bond succeeded');
			} catch(e) {
				yield put(peripheralBondFailedAction(action.peripheral));
				console.log('bond failed');
			}
		}),

		yield takeEvery(PeripheralRemoveBond, function* (action: PeripheralRemoveBond) {
			try {
				yield bleAdapter.BLEManger.removePeripheral(action.peripheral.id);
				yield put(peripheralBondRemovedAction(action.peripheral));
			} catch(e) {
				yield put(peripheralBondRemoveFailedAction(action.peripheral));
			}
		}),
	];
}
