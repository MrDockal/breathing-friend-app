import * as React from 'react';
import { Text } from 'react-native';
import { ListItemProps, Divider, Button as ButtonRN } from 'react-native-elements';
import { themeSchema } from '../Core/ThemeSchema/themeSchema';
import { Button } from './Button';
import { AppList } from './AppList';
import { Device } from '../Core/Entities/Device';
import { BreathingMode, DeviceSavedBreathingMode, BreathingSpeed } from '../Core/Entities/BreathingMode';

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
			subtitle: `${mode.speed[mode.activeSpeed].duration} minut`,
			rightTitle: `Pozice ${index + 1}`,
			rightTitleStyle: { paddingTop: 25 },
			onPress: () => this.props.goToModeDetail(mode, 'edit', mode.activeSpeed),
		}));
		const availableModesList = availableModes.map((mode: BreathingMode): ListItemProps => ({
			title: mode.name,
			subtitle: `${mode.speed.normal.duration} minut`,
			onPress: () => this.props.goToModeDetail(mode, 'add'),
		}));
		return (
			<React.Fragment>
				<Text style={{color: themeSchema.color.fontColor, fontSize: themeSchema.fontSize.h1}}>Lorem ipsum dole more</Text>
				<Text style={{color: themeSchema.color.fontColor, fontSize: themeSchema.fontSize.h2}}>Lorem ipsum dole more</Text>
				<Text style={{color: themeSchema.color.fontColor, fontSize: themeSchema.fontSize.normal}}>Lorem ipsum dole more</Text>
				<AppList list={activeModesList}/>
				<Divider/>
				<AppList list={availableModesList}/>
			</React.Fragment>
		)
	}
}
