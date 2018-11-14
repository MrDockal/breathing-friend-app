import { AndroidBleAdapter } from "../../Core/Bluetooth/AndroidBleAdapter";
import { takeEvery, put, select } from 'redux-saga/effects';
import { DeviceBreathingModesLoad, DeviceBreathingModesLoadedAction } from "../Actions/Device/deviceBreathingModesActions";
import { BREATHING_SERVICE, BREATHING_MODES_CHARACTERISCTICS } from "../../Core/Bluetooth/BLEConstants";
import { getDeviceBreathingModes } from "../../Core/Helpers/convertEntities";

export function* deviceBreathingModesSaga(bleAdapter: AndroidBleAdapter) {
	yield takeEvery(DeviceBreathingModesLoad, function* (action: DeviceBreathingModesLoad) {
		const data = yield bleAdapter.read(action.peripheralUid, BREATHING_SERVICE, BREATHING_MODES_CHARACTERISCTICS);
		const modes = getDeviceBreathingModes(data);
		yield put(DeviceBreathingModesLoadedAction(action.peripheralUid, modes));
	});
}