import { Device } from "../../../Core/Entities/Device";

/** SET */
export const SetActiveDevice = "Device.Set.Active";
export interface SetActiveDevice {
	type: typeof SetActiveDevice;
	device: Device;
}

export const setActiveDeviceAction = (device: Device): SetActiveDevice => ({
	type: SetActiveDevice,
	device,
});
