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
import { decodeDeviceBreathingModes, encodeDeviceBreathingMode } from '../../Core/Helpers/convertEntities';
import { DeviceBreathingModesLoadedAction, DeviceBreathingModeUpdate, DeviceBreathingModeUpdatedAction } from '../Actions/Device/deviceBreathingModesActions';
import { NotificationListenerStartAction } from '../Actions/notificationActions';
import { DeviceSavedBreathingMode, DeviceToBeSavedBreathingMode } from '../../Core/Entities/BreathingMode';
import { findBreathingModeDefinitionByUidAndSpeed } from '../../Core/Helpers/findBreathingModeDefinitionByUidAndSpeed';
import { stringToArrayBuffer } from '../../Core/Helpers/string-converter';

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
					await bleAdapter.BLEManager.connect(device.uid);
					connected = await bleAdapter.BLEManager.isPeripheralConnected(device.uid, []);
					if (connected === true) {
						bleAdapter.BLEManager.retrieveServices(device.uid, []);
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
			const state: State = yield select();
			const activeDeviceUid = state.device.devices[state.device.activeDeviceIndex].uid;
			const breathingMode = findBreathingModeDefinitionByUidAndSpeed(state.breathing.modes, action.mode.uid, action.mode.speed);
			if (!breathingMode) {
				throw new Error('Cannot update breathing mode that does not exists');
			}

			const newModes = state.device.devices[state.device.activeDeviceIndex].breathingModes
				.map((savedBreathingMode: DeviceSavedBreathingMode, index: number): DeviceToBeSavedBreathingMode => {
					if (index === action.index) {
						return {
							uid: action.mode.uid,
							speed: action.mode.speed,
							mode: breathingMode,
						}
					} else {
						return {
							...savedBreathingMode,
							mode: findBreathingModeDefinitionByUidAndSpeed(state.breathing.modes, savedBreathingMode.uid, savedBreathingMode.speed),
						}
					}
				});
			for (let modeToBeSaved of newModes ) {
				const encoded = encodeDeviceBreathingMode(modeToBeSaved.uid, modeToBeSaved.speed, modeToBeSaved.mode);
				const data = stringToArrayBuffer(JSON.stringify(encoded));
				console.log('data to save', data);
				yield bleAdapter.write(activeDeviceUid, BREATHING_SERVICE, BREATHING_MODES_CHARACTERISCTICS, data);
				yield bleAdapter.write(activeDeviceUid, BREATHING_SERVICE, BREATHING_MODES_CHARACTERISCTICS, [1, 95]);
			}

			yield put(DeviceBreathingModeUpdatedAction(action.mode, action.index));
		}),
	];
}
