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
