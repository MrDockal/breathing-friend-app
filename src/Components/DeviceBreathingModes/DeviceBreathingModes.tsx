import * as React from 'react';
import { Device } from '../../Core/Entities/Device';
import { BreathingMode, DeviceSavedBreathingMode, BreathingSpeed } from '../../Core/Entities/BreathingMode';
import { ColorTheme } from '../BackgroundGradient/BackgroundGradient';
import { BreathingList } from '../BreathingList/BreathingList';
import { AvailableBreathingListItemProps } from '../BreathingList/AvailableBreathingListItem';
import { ActiveBreathingListItemProps } from '../BreathingList/ActiveBreathingListItem';
import { getBreathingThemeByIndex } from '../../Core/Helpers/getBreathingTheme';
import { getActiveBreathingModes } from '../../Core/Helpers/getBreathingModesStatus';
import { i18n } from '../../Core/i18n/i18n';

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
		const minutesText = i18n.t('minutes', {count: justMinutes});
		const secondsText = i18n.t('seconds', {count: seconds});
		return `${justMinutes} ${minutesText} ${(seconds > 0) ? `${seconds} ${secondsText}` : ''}`;
	}

	private prepareBreathingModes() {
		const activeModesUids = this.props.activeDevice.breathingModes.map((mode: DeviceSavedBreathingMode) => mode.uid);
		const activeModes = getActiveBreathingModes(this.props.activeDevice.breathingModes, this.props.breathingModes);
		const availableModes = this.props.breathingModes.filter((mode: BreathingMode) => {
			return (activeModesUids.indexOf(mode.uid) === -1);
		});
		const activeModesList = activeModes.map((mode: BreathingModeWithActiveSpeed, index: number): ActiveBreathingListItemProps => ({
			title: i18n.t(mode.name),
			duration: this.convertMinutesToText(mode.speed[mode.activeSpeed].duration),
			position: index + 1,
			theme: getBreathingThemeByIndex(index),
			speed: i18n.t(mode.activeSpeed),
			onPress: () => this.props.goToModeDetail(mode, 'edit', getBreathingThemeByIndex(index), index, mode.activeSpeed),
		}));
		const availableModesList = availableModes.map((mode: BreathingMode): AvailableBreathingListItemProps => ({
			title: i18n.t(mode.name),
			duration: this.convertMinutesToText(mode.speed.normal.duration),
			onPress: () => this.props.goToModeDetail(mode, 'add', getBreathingThemeByIndex(), -1),
		}));
		return {
			activeModesList,
			availableModesList
		}
	}
}
