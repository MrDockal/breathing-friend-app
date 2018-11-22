import * as React from 'react';
import { ListItemProps, Divider } from 'react-native-elements';
import { AppList } from './AppList';
import { Device } from '../Core/Entities/Device';
import { BreathingMode, DeviceSavedBreathingMode, BreathingSpeed } from '../Core/Entities/BreathingMode';
import { H1 } from './Text/H1';
import { H2 } from './Text/H2';
import { TextNormal } from './Text/TextNormal';

interface BreathingModeWithActiveSpeed extends BreathingMode {
	activeSpeed: keyof BreathingSpeed;
}

export interface OwnProps {
	activeDevice: Device;
	breathingModes: BreathingMode[];
	goToModeDetail: (mode: BreathingMode, action: 'add' | 'edit',  defaultSpeed?: keyof BreathingSpeed) => void;
}

export class DeviceBreathingModes extends React.Component<OwnProps> {
	public render() {
		const breathingModes = this.prepareBreathingModes();
		return (
			<React.Fragment>
				<H1>Lorem ipsum dole more</H1>
				<H2>Lorem ipsum dole more</H2>
				<TextNormal>Lorem ipsum dole more</TextNormal>
				<AppList list={breathingModes.activeModesList}/>
				<Divider/>
				<AppList list={breathingModes.availableModesList}/>
			</React.Fragment>
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
		const activeModesList = activeModes.map((mode: BreathingModeWithActiveSpeed, index: number): ListItemProps => ({
			title: mode.name,
			subtitle: this.convertMinutesToText(mode.speed[mode.activeSpeed].duration),
			rightTitle: `Pozice ${index + 1}`,
			rightTitleStyle: { paddingTop: 25 },
			onPress: () => this.props.goToModeDetail(mode, 'edit', mode.activeSpeed),
		}));
		const availableModesList = availableModes.map((mode: BreathingMode): ListItemProps => ({
			title: mode.name,
			subtitle: `${mode.speed.normal.duration} minut`,
			onPress: () => this.props.goToModeDetail(mode, 'add'),
		}));
		return {
			activeModesList,
			availableModesList
		}
	}
}
