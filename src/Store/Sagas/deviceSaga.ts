import { takeEvery, put, select } from 'redux-saga/effects';
import { Dispatch } from "redux";
import { DiscoverBondedDevices, discoveredBondedDevicesAction, discoverBondedDevicesAction, PauseDiscoverBondedDevices, PeripheralBondStart, peripheralBondSucceededAction, peripheralBondFailedAction, PeripheralRemoveBond, peripheralBondRemovedAction, peripheralBondRemoveFailedAction } from "../Actions/Device/devicesBondActions";
import { State } from "../configureStore";
import { Device } from "../../Core/Entities/Device";
import { wait } from "../../Core/Helpers/wait";
import { ScanForAvailablePeripherals, availablePeripheralObtainedAction, peripheralScanStoppedAction, StopScanForAvailablePeripherals } from "../Actions/Device/deviceScanActions";
import { AndroidBleAdapter } from '../../Core/Bluetooth/AndroidBleAdapter';
import { BleManagerDiscoverPeripheralResponse } from 'react-native-ble-manager';
import { DeviceConnectionInitialize, DeviceConnectionInitializedAction, setActiveDeviceAction } from '../Actions/Device/deviceActions';
import { BREATHING_SERVICE, BREATHING_MODES_CHARACTERISCTICS, STATS_SERVICE, STATS_SERVICE_CHARACTERISTICS } from '../../Core/Bluetooth/BLEConstants';
import { decodeDeviceBreathingModes } from '../../Core/Helpers/convertEntities';
import { DeviceBreathingModesLoadedAction, DeviceBreathingModeUpdate } from '../Actions/Device/deviceBreathingModesActions';
import { NotificationListenerStartAction } from '../Actions/notificationActions';

export function* deviceSaga (bleAdapter: AndroidBleAdapter, dispatch: Dispatch) {
	let discoverBondedAction = false;
	return [
		yield takeEvery(DiscoverBondedDevices, function* () {
			if (discoverBondedAction) {
				return;
			}
			discoverBondedAction = true;
			yield bleAdapter.init();
			const state: State = yield select();

			const devicesPromise = state.device.devices.map(async (device: Device) => {
				let connected = false;
				try {
					const isConnected = await bleAdapter.BLEManager.isPeripheralConnected(device.uid, []);
					if (isConnected === true) {
						connected = true;
					} else {
						await bleAdapter.BLEManager.connect(device.uid);
					}
				} catch (e) {
					connected = false;
				}
				return {
					...device,
					connected,
				}
			});
			const devices = yield Promise.all(devicesPromise);

			yield put(discoveredBondedDevicesAction(devices));
			yield wait(5000);
			if (discoverBondedAction) {
				discoverBondedAction = false;
				yield put(discoverBondedDevicesAction());
			}
		}),

		yield takeEvery(PauseDiscoverBondedDevices, () => {
			discoverBondedAction = false;
		}),


		yield takeEvery(ScanForAvailablePeripherals, function* (_action: ScanForAvailablePeripherals) {
			const discoveredPeripheralCb = (peripheral: BleManagerDiscoverPeripheralResponse) => {
				dispatch(availablePeripheralObtainedAction(peripheral));
			}
			yield bleAdapter.scanPeripherals(5, discoveredPeripheralCb);
			yield put(peripheralScanStoppedAction());
		}),

		yield takeEvery(StopScanForAvailablePeripherals, function* (_action: StopScanForAvailablePeripherals) {
			yield bleAdapter.BLEManager.stopScan();
			yield put(peripheralScanStoppedAction());
		}),

		yield takeEvery(PeripheralBondStart, function* (action: PeripheralBondStart) {
			try {
				yield bleAdapter.BLEManager.connect(action.peripheral.id);
				yield put(peripheralBondSucceededAction(action.peripheral));
			} catch(e) {
				yield put(peripheralBondFailedAction(action.peripheral));
			}
		}),

		yield takeEvery(PeripheralRemoveBond, function* (action: PeripheralRemoveBond) {
			try {
				yield bleAdapter.BLEManager.removePeripheral(action.peripheral.id);
				yield put(peripheralBondRemovedAction(action.peripheral));
			} catch(e) {
				yield put(peripheralBondRemoveFailedAction(action.peripheral));
			}
		}),

		yield takeEvery(DeviceConnectionInitialize, function* (action: DeviceConnectionInitialize) {
			const breathingModesBytes = yield bleAdapter.read(action.device.uid, BREATHING_SERVICE, BREATHING_MODES_CHARACTERISCTICS);
			const modes = decodeDeviceBreathingModes(breathingModesBytes);
			yield put(DeviceBreathingModesLoadedAction(action.device.uid, modes));
			yield put(NotificationListenerStartAction());
			yield bleAdapter.startNotification(action.device.uid, STATS_SERVICE, STATS_SERVICE_CHARACTERISTICS);

			yield bleAdapter.write(action.device.uid, STATS_SERVICE, STATS_SERVICE_CHARACTERISTICS, {}); //Enable stats

			yield put(setActiveDeviceAction(action.device))
			yield put(DeviceConnectionInitializedAction(action.device.uid));
		}),

		yield takeEvery(DeviceBreathingModeUpdate, function* (action: DeviceBreathingModeUpdate) {

		}),
	];
}
