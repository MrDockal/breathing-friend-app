import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { DeviceConnectionInfoBar } from '../DeviceConnectionInfoBar';
import { BackgroundGradient, ColorTheme } from '../../Components/BackgroundGradient/BackgroundGradient';
import { DeviceTile } from '../../Components/DeviceTile/DeviceTile';
import { Device } from '../../Core/Entities/Device';
import { connect } from 'react-redux';
import { State } from '../../Store/configureStore';
import { themeSchema } from '../../Core/ThemeSchema/themeSchema';
import { H1 } from '../../Components/Text/H1';
import { TextNormal } from '../../Components/Text/TextNormal';
import { BreathingStatInterval, DeviceStat } from '../../Store/Reducers/statsReducer';
import { StatsListItem } from '../../Components/StatsListItem/StatsListItem';
import { Hr } from '../../Components/Hr/Hr';
import { BreathingMode } from '../../Core/Entities/BreathingMode';
import { getBreathingModeByStateAndUid } from '../../Core/Helpers/getBreathingTheme';
import { ActivityIndicator } from '../../Components/ActivityIndicator/ActivityIndicator';

const styles = StyleSheet.create({
	wrapper: {
		flexGrow: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'stretch',
		paddingHorizontal: 30,
	},
	overview: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	blue: {
		color: themeSchema.button.blue.fontColor
	},
	tableHeader: {
		paddingBottom: 10,
	}
});

interface StateProps {
	device: Device;
	stats?: DeviceStat;
	breathingMode: BreathingMode[];
}

interface NumberOfTimes {
	[id: string]: number;
}

export class StatsScreenHOC extends React.Component<StateProps> {
	public render() {
		const hasData = this.props.stats;
		const theme = 'black';
		const loaded = this.props.breathingMode;
		return (
			<BackgroundGradient theme={theme}>
				<ScrollView contentContainerStyle={styles.wrapper}>
					{
						loaded ?
							<React.Fragment>
								<DeviceTile name={this.props.device.name} />
								{
									!hasData ?
										this.renderEmpty() :
										this.renderWithData(theme)
								}
							</React.Fragment> :
							<ActivityIndicator />
					}
				</ScrollView>
				<DeviceConnectionInfoBar />
			</BackgroundGradient>
		)
	}

	private renderEmpty() {
		return (
			<TextNormal>Zatím nejsou k dipozici data o používání</TextNormal>
		);
	}

	private renderWithData(theme: ColorTheme) {
		const data = this.loadData();
		const getThemeByUid = getBreathingModeByStateAndUid(this.props.device.breathingModes);
		return (
			<React.Fragment>
				<View>
					<View style={styles.overview}>
						<H1 style={styles.blue}>{data.totalTime.toLocaleString()}</H1>
						<TextNormal style={styles.blue}> minut</TextNormal>
					</View>
					<TextNormal bold={true}>Celkem nadýcháno</TextNormal>
				</View>
				<View>
					<TextNormal bold={true} style={styles.tableHeader}>Tento měsíc</TextNormal>
					{
						Object.keys(data.weekly).map((breathingId: string, index: number) => (
							<React.Fragment key={index}>
								<StatsListItem
									theme={getThemeByUid(breathingId)}
									rightText={data.weekly[breathingId].toString() + 'x'}
									title={this.getModeNameByUid(breathingId)}
								/>
								<Hr theme={theme} />
							</React.Fragment>
						))
					}
				</View>
			</React.Fragment>
		);
	}

	private getModeNameByUid(modeUid: string) {
		const found = this.props.breathingMode.find((mode: BreathingMode) => modeUid === mode.uid)
		if (!found) {
			return 'Neznámé';
		} else {
			return found.name;
		}
	}

	private loadData() {
		if (!this.props.stats) {
			throw new Error('Could not load stat data');
		}
		const totalTimeInMinues = this.getTotalTime(this.props.stats.stats);
		const weeklyStats = this.getWeeklyStats(this.props.stats.stats);
		return {
			totalTime: totalTimeInMinues,
			weekly: weeklyStats,
		}
	}

	private getTotalTime(flattern: BreathingStatInterval[]) {
		return flattern.reduce((cumullated: number, next: BreathingStatInterval) => {
			return cumullated + Math.floor(Math.abs((next.to - next.since) / 1E3 / 60));
		}, 0);
	}

	private getWeeklyStats(flattern: BreathingStatInterval[]): NumberOfTimes {
		const lastWeek = new Date();
		lastWeek.setDate(lastWeek.getDate() - 300);
		const thisWeek = flattern.filter((flat: BreathingStatInterval) => flat.to > lastWeek.valueOf());
		return thisWeek.reduce((cummulated: NumberOfTimes, next: BreathingStatInterval) => {
			const countTimes = (next.breathingUid in cummulated) ? cummulated[next.breathingUid] : 0;
			return {
				...cummulated,
				[next.breathingUid]: countTimes + 1,
			}
		}, {});
	}
}

export const StatsScreen = connect<StateProps>(
	(state: State) => ({
		device: state.device.devices[state.device.activeDeviceIndex],
		stats: state.stats.stats.find((stat: DeviceStat) => stat.deviceUid === state.device.devices[state.device.activeDeviceIndex].uid),
		breathingMode: state.breathing.modes,
	})
)(StatsScreenHOC);
