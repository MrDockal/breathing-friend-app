import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { DeviceConnectionInfoBar } from './DeviceConnectionInfoBar';
import { BackgroundGradient } from '../Components/BackgroundGradient';
import { DeviceTile } from '../Components/DeviceTile/DeviceTile';
import { Device } from '../Core/Entities/Device';
import { connect } from 'react-redux';
import { State } from '../Store/configureStore';
import { themeSchema } from '../Core/ThemeSchema/themeSchema';
import { H1 } from '../Components/Text/H1';
import { TextNormal } from '../Components/Text/TextNormal';
import { StatsState, BreathingStatInterval } from '../Store/Reducers/statsReducer';
import { StatsListItem } from '../Components/StatsListItem/StatsListItem';
import { Hr } from '../Components/Hr/Hr';
import { BreathingMode } from '../Core/Entities/BreathingMode';
import { getBreathingModeByStateAndUid } from '../Core/Helpers/getBreathingTheme';

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
	stats: StatsState;
	breathingMode: BreathingMode[];
}

interface FlatternData {
	id: string;
	since: number;
	to: number;
}

interface SemiFlatternData {
	id: string;
	stats: BreathingStatInterval[]
}

interface NumberOfTimes {
	[id: string]: number;
}

export class StatsScreenHOC extends React.Component<StateProps> {
	public render() {
		const data = this.loadData();
		const theme = 'black';
		const getThemeByUid = getBreathingModeByStateAndUid(this.props.device.breathingModes);
		return (
			<BackgroundGradient theme={theme}>
				<ScrollView contentContainerStyle={styles.wrapper}>
					<DeviceTile name={this.props.device.name} />
					<View>
						<View style={styles.overview}>
							<H1 style={styles.blue}>{data.totalTime.toLocaleString()}</H1>
							<TextNormal style={styles.blue}> minut</TextNormal>
						</View>
						<TextNormal bold={true}>Celkem nadýcháno</TextNormal>
					</View>
					<View>
						<TextNormal bold={true} style={styles.tableHeader}>Tento tento měsíc</TextNormal>
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
				</ScrollView>
			</BackgroundGradient>
		)
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
		const flattern = this.getFlatternData();
		const totalTimeInMinues = this.getTotalTime(flattern);
		const weeklyStats = this.getWeeklyStats(flattern);
		return {
			totalTime: totalTimeInMinues,
			weekly: weeklyStats,
		}
	}

	private getFlatternData() {
		const breathingIds = Object.keys(this.props.stats.stats);
		const idAndStats: SemiFlatternData[] = breathingIds.map((id: string) => {
			return {
				id,
				stats: this.props.stats.stats[id],
			}
		});
		return idAndStats.reduce((cumullated: FlatternData[], next: SemiFlatternData): FlatternData[] => {
			const stats = next.stats.map((stat: BreathingStatInterval) => ({
				...stat,
				id: next.id
			}));
			return [...cumullated, ...stats]
		}, []);
	}

	private getTotalTime(flattern: FlatternData[]) {
		return flattern.reduce((cumullated: number, next: FlatternData) => {
			return cumullated + Math.floor(Math.abs((next.to - next.since) / 1E3 / 60));
		}, 0);
	}

	private getWeeklyStats(flattern: FlatternData[]): NumberOfTimes {
		const lastWeek = new Date();
		lastWeek.setDate(lastWeek.getDate() - 300);
		const thisWeek = flattern.filter((flat: FlatternData) => flat.to > lastWeek.valueOf());
		return thisWeek.reduce((cummulated: NumberOfTimes, next: FlatternData) => {
			const countTimes = (next.id in cummulated) ? cummulated[next.id] : 0;
			return {
				...cummulated,
				[next.id]: countTimes + 1,
			}
		}, {});
	}
}

export const StatsScreen = connect<StateProps>(
	(state: State) => ({
		device: state.device.devices[state.device.activeDeviceIndex],
		stats: state.stats,
		breathingMode: state.breathing.modes,
	})
)(StatsScreenHOC);
