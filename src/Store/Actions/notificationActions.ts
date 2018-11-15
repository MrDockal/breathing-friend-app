export const NotificationListenerStart = "Notification.Lister.Start";
export interface NotificationListenerStart {
	type: typeof NotificationListenerStart;
}

export const NotificationListenerStartAction = (): NotificationListenerStart => ({
	type: NotificationListenerStart,
});

export const NotificationListenerStarted = "Notification.Lister.Started";
export interface NotificationListenerStarted {
	type: typeof NotificationListenerStarted;
}

export const NotificationListenerStartedAction = (): NotificationListenerStarted => ({
	type: NotificationListenerStarted,
});

export const NewNotificationObtained = "Notification.New.Obtained";
export interface NewNotificationObtained {
	type: typeof NewNotificationObtained;
	data: any;
	peripheralId: string;
	notificationUid: string;
}

export const NewNotificationObtainedAction = (data: any, peripheralId: string, notificationUid: string): NewNotificationObtained => ({
	type: NewNotificationObtained,
	data,
	peripheralId,
	notificationUid,
});
