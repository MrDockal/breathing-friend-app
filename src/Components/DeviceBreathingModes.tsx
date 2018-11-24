import * as React from 'react';
import { Device } from '../Core/Entities/Device';
import { BreathingMode, DeviceSavedBreathingMode, BreathingSpeed } from '../Core/Entities/BreathingMode';
import { ColorTheme } from './BackgroundGradient';
import { BreathingList } from './BreathingList/BreathingList';
import { AvailableBreathingListItemProps } from './BreathingList/AvailableBreathingListItem';
import { ActiveBreathingListItemProps } from './BreathingList/ActiveBreathingListItem';

interface BreathingModeWithActiveSpeed extends BreathingMode {
	activeSpeed: keyof BreathingSpeed;
}

export interface OwnProps {
	activeDevice: Device;
	breathingModes: BreathingMode[];
	goToModeDetail: (mode: BreathingMode, action: 'add' | 'edit', theme: ColorTheme, position: number, defaultSpeed?: keyof BreathingSpeed) => void;
}

export class DeviceBreathingModes extends React.Component<OwnProps> {
	public render() {
		const breathingModes = this.prepareBreathingModes();
		return (
			<BreathingList active={breathingModes.activeModesList} available={breathingModes.availableModesList} />
		)
	}

	private convertMinutesToText(minutes: number) {
		const minutesFixed = parseFloat(minutes.toFixed(2));
		const justMinutes = Math.trunc(minutesFixed);
		const seconds = Math.round((minutesFixed - justMinutes) * 60);
		return `${justMinutes} minutes ${(seconds > 0) ? `${seconds} seconds` : ''}`;
	}

	private prepareBreathingModes() {
		const activeModesUids = this.props.activeDevice.breathingModes.map((mode: DeviceSavedBreathingMode) => mode.uid);
		const activeModes = this.props.breathingModes
			.filter((mode: BreathingMode) => activeModesUids.indexOf(mode.uid) >= 0)
			.map((mode: BreathingMode): BreathingModeWithActiveSpeed => {
				return {
					...mode,
					activeSpeed: this.props.activeDevice.breathingModes.find((savedMode: DeviceSavedBreathingMode) => savedMode.uid === mode.uid)!.speed
				}
			});
		const availableModes = this.props.breathingModes.filter((mode: BreathingMode) => {
			return (activeModesUids.indexOf(mode.uid) === -1);
		});
		const activeModesList = activeModes.map((mode: BreathingModeWithActiveSpeed, index: number): ActiveBreathingListItemProps => ({
			title: mode.name,
			duration: this.convertMinutesToText(mode.speed[mode.activeSpeed].duration),
			position: index + 1,
			theme: this.getThemeByIndex(index),
			speed: mode.activeSpeed,
			onPress: () => this.props.goToModeDetail(mode, 'edit', this.getThemeByIndex(index), index, mode.activeSpeed),
		}));
		const availableModesList = availableModes.map((mode: BreathingMode): AvailableBreathingListItemProps => ({
			title: mode.name,
			duration: `${mode.speed.normal.duration} minut`,
			onPress: () => this.props.goToModeDetail(mode, 'add', this.getThemeByIndex(), -1),
		}));
		return {
			activeModesList,
			availableModesList
		}
	}

	private getThemeByIndex(index?: number) {
		switch (index) {
			case 0:
				return 'red';
			case 1:
				return 'blue';
			case 2:
				return 'orange';
			default:
				return 'black';
		}
	}
}
