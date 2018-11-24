import { AndroidBleAdapter } from "../../Core/Bluetooth/AndroidBleAdapter";
import { takeEvery, put } from 'redux-saga/effects';
import { BleManagerDidUpdateValueForCharacteristicResponse } from "react-native-ble-manager";
import { parseBluetoothMessage } from "../../Core/Helpers/parseBluetoothMessage";
import { NotificationListenerStart, NotificationListenerStartedAction, NewNotificationObtainedAction, NotificationData } from "../Actions/notificationActions";
import { Dispatch } from "redux";
import { MessageStack } from "../../Core/Bluetooth/MessageStack";

export function* notificationSaga(bleAdapter: AndroidBleAdapter, dispatch: Dispatch) {
	const messageStack = new MessageStack();

	const notificationHandler = (data: BleManagerDidUpdateValueForCharacteristicResponse) => {
		const id = data.peripheral + data.characteristic + data.service;
		messageStack.addMessage(id, data.value);
		if (messageStack.isMessageComplete(id)) {
			const message = messageStack.popCompletedMessage(id);
			const dataUtf8 = parseBluetoothMessage(message);
			const actionData = {
				breathingUid: dataUtf8[0],
				since: dataUtf8[1],
				to: dataUtf8[2],
			} as NotificationData;
			const notificationAction = NewNotificationObtainedAction(actionData, data.peripheral, data.characteristic + data.service);
			console.info('Notification received', notificationAction)
			dispatch(notificationAction);
		}
	}

	yield takeEvery(NotificationListenerStart, function* (action: NotificationListenerStart) {
		bleAdapter.removeNotificationListener(notificationHandler);
		bleAdapter.onNewNotificationListener(notificationHandler);
		yield put(NotificationListenerStartedAction());
	});
}