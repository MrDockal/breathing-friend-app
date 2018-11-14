import { AndroidBleAdapter } from "../../Core/Bluetooth/AndroidBleAdapter";
import { takeEvery, put } from 'redux-saga/effects';
import { BleManagerDidUpdateValueForCharacteristicResponse } from "react-native-ble-manager";
import { parseBluetoothMessage } from "../../Core/Helpers/parseBluetoothMessage";
import { NotificationListenerStart, NotificationListenerStartedAction, NewNotificationObtainedAction } from "../Actions/notificationActions";
import { Dispatch } from "redux";
import { MessageStack } from "../../Core/Bluetooth/MessageStack";

export function* notificationSaga(bleAdapter: AndroidBleAdapter, dispatch: Dispatch) {
	const messageStack = new MessageStack();

	yield takeEvery(NotificationListenerStart, function* (action: NotificationListenerStart) {
		bleAdapter.onNewNotificationListener((data: BleManagerDidUpdateValueForCharacteristicResponse) => {
			const id = data.peripheral + data.characteristic + data.service;
			messageStack.addMessage(id, data.value);
			if (messageStack.isMessageComplete(id)) {
				const message = messageStack.popCompletedMessage(id);
				const dataUtf8 = parseBluetoothMessage(message);
				const notificationAction = NewNotificationObtainedAction(dataUtf8, data.peripheral, data.characteristic + data.service);
				console.info('Notification received', notificationAction)
				dispatch(notificationAction);
			}
		});
		yield put(NotificationListenerStartedAction());
	});
}