import { Device } from "../../../Core/Entities/Device";

/** SET ACTIVE */
export const SetActiveDevice = "Device.Set.Active";
export interface SetActiveDevice {
	type: typeof SetActiveDevice;
	device: Device;
}

export const setActiveDeviceAction = (device: Device): SetActiveDevice => ({
	type: SetActiveDevice,
	device,
});

/** SET NAME */
export const DeviceSetName = "Device.Set.Name";
export interface DeviceSetName {
	type: typeof DeviceSetName;
	uid: string;
	name: string;
}

export const deviceSetNameAction = (uid: string, name: string): DeviceSetName => ({
	type: DeviceSetName,
	uid,
	name,
});

/** CONNECTION INTIALIZE */
export const DeviceConnectionInitialize = "Device.Connection.Initialize";
export interface DeviceConnectionInitialize {
	type: typeof DeviceConnectionInitialize;
	device: Device;
}

export const DeviceConnectionInitializeAction = (device: Device): DeviceConnectionInitialize => ({
	type: DeviceConnectionInitialize,
	device,
});

/** CONNECTION INTIALIZED */
export const DeviceConnectionInitialized = "Device.Connection.Initialized";
export interface DeviceConnectionInitialized {
	type: typeof DeviceConnectionInitialized;
	uid: string;
}

export const DeviceConnectionInitializedAction = (uid: string): DeviceConnectionInitialized => ({
	type: DeviceConnectionInitialized,
	uid,
});

/** CONNECTION INTIALIZE */
export const DeviceConnectionRemove = "Device.Connection.Remove";
export interface DeviceConnectionRemove {
	type: typeof DeviceConnectionRemove;
	device: Device;
}

export const DeviceConnectionRemoveAction = (device: Device): DeviceConnectionRemove => ({
	type: DeviceConnectionRemove,
	device,
});

/** CONNECTION INTIALIZED */
export const DeviceConnectionRemoved = "Device.Connection.Removed";
export interface DeviceConnectionRemoved {
	type: typeof DeviceConnectionRemoved;
	device: Device;
}

export const DeviceConnectionRemovedAction = (device: Device): DeviceConnectionRemoved => ({
	type: DeviceConnectionRemoved,
	device,
});
